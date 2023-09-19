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
      expect(await gameTicket.balanceOf(gameTicket.target)).to.equal(tokens(0))
    })
  })

  //Claim Tickets Collected in game
  describe('Claim Tickets Collected In Game', () => {
    it('first game user1 tickets collected', async () => {
      const gameOneAmount = tokens(14)

      await gameTicket.mintEarnedTickets(user1.address, gameOneAmount)

      const user1Balance = await gameTicket.balanceOf(user1.address)
      expect(user1Balance).to.equal(gameOneAmount)
    })

    it('second game user1 tickets collected', async () => {
      const gameTwoAmount = tokens(28)
      const currentUser1Balance = await gameTicket.balanceOf(user1.address)

      await gameTicket.mintEarnedTickets(user1.address, gameTwoAmount)

      const user1GameTwoBalance = await gameTicket.balanceOf(user1.address)
      expect(user1GameTwoBalance).to.equal(currentUser1Balance + gameTwoAmount)
    })

    it('third game user1 tickets collected', async () => {
      const gameThreeAmount = tokens(47)
      const currentUser1Balance = await gameTicket.balanceOf(user1.address)

      await gameTicket.mintEarnedTickets(user1.address, gameThreeAmount)

      const user1GameThreeBalance = await gameTicket.balanceOf(user1.address)
      expect(user1GameThreeBalance).to.equal(currentUser1Balance + gameThreeAmount)
    })

    it('fourth game user1 tickets collected', async () => {
      const gameFourAmount = tokens(61)
      const currentUser1Balance = await gameTicket.balanceOf(user1.address)

      await gameTicket.mintEarnedTickets(user1.address, gameFourAmount)

      const user1GameFourBalance = await gameTicket.balanceOf(user1.address)
      expect(user1GameFourBalance).to.equal(currentUser1Balance + gameFourAmount)
    })

    it('total earned tickets from user1 equals 150 GameTickets', async () => {
      const user1TotalAmount = await gameTicket.balanceOf(user1.address)
      
      expect(user1TotalAmount).to.equal(tokens(150))
    })
  })

  //send GameTickets to other wallet address
  describe('Transfer user1 GameTickets to other wallet address', () => {
    it('user1 sends 10 gameTickets to user2', async () => {
      const user1BalanceBefore = await gameTicket.balanceOf(user1.address)
      const user2BalanceBefore = await gameTicket.balanceOf(user2.address)
      const transferAmount = tokens(10)
    
      await gameTicket.connect(user1).transfer(user2.address, transferAmount)
    
      const user1BalanceAfter = await gameTicket.balanceOf(user1.address)
      const user2BalanceAfter = await gameTicket.balanceOf(user2.address)
    
      expect(user1BalanceAfter).to.equal(user1BalanceBefore - transferAmount)
      expect(user2BalanceAfter).to.equal(user2BalanceBefore + transferAmount)
    })

    it('user1 sends 20 gameTickets to user2', async () => {
      const user1BalanceBefore = await gameTicket.balanceOf(user1.address)
      const user2BalanceBefore = await gameTicket.balanceOf(user2.address)
      const TransferSecondAmount = tokens(20)

      await gameTicket.connect(user1).transfer(user2.address, TransferSecondAmount)

      const user1BalanceAfter = await gameTicket.balanceOf(user1.address)
      const user2BalanceAfter = await gameTicket.balanceOf(user2.address)

      expect(user1BalanceAfter).to.equal(user1BalanceBefore - TransferSecondAmount)
      expect(user2BalanceAfter).to.equal(user2BalanceBefore + TransferSecondAmount)
    })

    it('user2 sends 10 gameTickets to deployer and 5 back to user1', async () => {
      const user2BalanceBefore = await gameTicket.balanceOf(user2.address)
      const deployerBalanceBefore = await gameTicket.balanceOf(deployer.address)
      const transferToDeployer = tokens(10)
      const transferToUser1 = tokens(5)

      await gameTicket.connect(user2).transfer(deployer.address, transferToDeployer)

      const deployerBalanceAfter = await gameTicket.balanceOf(deployer.address)
      const user2BalanceAfter = await gameTicket.balanceOf(user2.address)

      expect(deployerBalanceAfter).to.equal(deployerBalanceBefore + transferToDeployer)
      expect(user2BalanceAfter).to.equal(user2BalanceBefore - transferToDeployer)

      const user1BalanceBefore = await gameTicket.balanceOf(user1.address)
      const user2BalanceBeforeTransferToUser1 = await gameTicket.balanceOf(user2.address)

      await gameTicket.connect(user2).transfer(user1.address, transferToUser1)

      const user1BalanceAfter = await gameTicket.balanceOf(user1.address)
      const user2BalanceAfterTransferToUser1 = await gameTicket.balanceOf(user2.address)

      expect(user1BalanceAfter).to.equal(user1BalanceBefore + transferToUser1)
      expect(user2BalanceAfterTransferToUser1).to.equal(user2BalanceBeforeTransferToUser1 - transferToUser1)
    })
  })

  // Pay the roulette game entry
  describe('Pay The Roulette Game Entry', () => {
    it('should successfully deduct 100 GMTT tokens from the user balance when paying to spin', async () => {
      const user1BalanceBefore = await gameTicket.balanceOf(user1.address);

      // Check if user1BalanceBefore is greater than or equal to 100 GMTT tokens
      expect(user1BalanceBefore >= ethers.parseEther("100.0")).to.be.true;

      // Call payRoulette
      await gameTicket.connect(user1).payRoulette();

      // Check if the balance decreased by exactly 100 GMTT tokens
      expect(parseFloat(ethers.formatEther(user1BalanceBefore - ethers.parseEther("100.0"))).toFixed(1)).to.equal('25.0');

    });
  });

  //distribute GMTT Tickets as rewards
  describe('', () => {
    it('', async () => {

    })
  })
})
