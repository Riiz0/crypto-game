const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

describe ('GameTicket', () => {
  let gameTicket, accounts, deployer, user1, user2

  before(async () => {
    const GameTicket = await ethers.getContractFactory('GameTicket')
    gameTicket = await GameTicket.deploy()
    await gameTicket.waitForDeployment()

    console.log(`Contract Address: ${gameTicket.target}`)

    accounts = await ethers.getSigners()
    deployer = accounts[0]
    user1 = accounts[1]
    user2 = accounts[2]
  })

  describe('Deployment', () => {
    it('Should have correct name, symbol, decimals, and total supply', async () => {
      expect(await gameTicket.name()).to.equal('GameTicket')
      expect(await gameTicket.symbol()).to.equal('GMTT')
      expect(await gameTicket.decimals()).to.equal(18)
      expect(await gameTicket.totalSupply()).to.equal(tokens(0))
    })

    it('Should assign entire total supply to the contract', async () => {
      expect(await gameTicket.balanceOf(deployer.address)).to.equal(tokens(0))
    })
  })

  describe('Minting', () => {
    it('Should allow deployer to mint tickets', async () => {
      const mintAmount = tokens(1000)
      await gameTicket.mintTickets(deployer.address, mintAmount)

      expect(await gameTicket.balanceOf(deployer.address)).to.equal(mintAmount)
    })

    it('Should not allow non-deployer to mint tickets', async () => {
      const mintAmount = tokens(1000)

      await expect(
        gameTicket.connect(user1).mintTickets(user2.address, mintAmount)
      ).to.be.revertedWith('Ownable: caller is not the owner')
    })
  })

  describe('Ticket Distribution', () => {
    it('Should allow deployer to distribute tickets', async () => {
      const distributeAmount = tokens(1000)
      await gameTicket.distributeTickets(user1.address, distributeAmount)

      expect(await gameTicket.balanceOf(user1.address)).to.equal(tokens(1000))
    });

    it('Should not allow non-deployer to distribute tickets', async () => {
      const distributeAmount = tokens(1000)

      await expect(
        gameTicket.connect(user1).distributeTickets(user2.address, distributeAmount)
      ).to.be.revertedWith('Ownable: caller is not the owner')
    })
  })

  describe('Ticket Burning', () => {
    it('Should allow users to burn tickets', async () => {
      const burnAmount = tokens(250)
      const user1BalanceBefore = await gameTicket.balanceOf(user1.address)

      await gameTicket.connect(user1).burnTickets(burnAmount)

      expect(await gameTicket.balanceOf(user1.address)).to.equal(user1BalanceBefore - burnAmount)
    })

    it('Should not allow users to burn more tickets than they have', async () => {
      const burnAmount = tokens(1000);
    
      await expect(
        gameTicket.connect(user1).burnTickets(burnAmount)
      ).to.be.revertedWith('Insufficient GameTickets');
    });    

    it('Should emit a TokenTransfer event when burning tickets', async () => {
      const burnAmount = tokens(100)

      await expect(gameTicket.connect(user1).burnTickets(burnAmount))
        .to.emit(gameTicket, 'TokenTransfer')
        .withArgs(user1.address, '0x0000000000000000000000000000000000000000', burnAmount)
    })
  })

  describe('Roulette Game Entry', () => {
    it('Should allow users to pay entry with 100 GameTickets', async () => {
      const entryFee = tokens(100);
      const user1BalanceBefore = await gameTicket.balanceOf(user1.address);
    
      await gameTicket.connect(user1).payEntry();
    
      // Convert BigNumber values to JavaScript numbers and then compare
      const expectedBalance = Number(user1BalanceBefore.toString()) - Number(entryFee.toString());
      const user1BalanceAfter = await gameTicket.balanceOf(user1.address);

      const finalTotalBalance = (Number(user1BalanceAfter.toString()) - Number(entryFee.toString()))

      expect(finalTotalBalance).to.equal(expectedBalance);
    })
    
  
    it('Should not allow users with insufficient tickets to pay entry', async () => {
      const user2BalanceBefore = await gameTicket.balanceOf(user2.address)
  
      await expect(
        gameTicket.connect(user2).payEntry()
      ).to.be.revertedWith('Insufficient GameTickets')
  
      expect(await gameTicket.balanceOf(user2.address)).to.equal(user2BalanceBefore)
    })
  })
})
