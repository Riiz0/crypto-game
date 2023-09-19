const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

describe('GameToken', () => {
  let gameToken, accounts, deployer, user1, user2

  before(async () => {
    const GameToken = await ethers.getContractFactory('GameToken')
    gameToken = await GameToken.deploy()
    await gameToken.waitForDeployment()

    console.log(`Contract address: ${gameToken.target}`)

    accounts = await ethers.getSigners()
    deployer = accounts[0]
    user1 = accounts[1]
    user2 = accounts[2]
  });

  describe('Deployment', () => {
    it('Should have correct name, symbol, decimals, and total supply', async () => {
      expect(await gameToken.name()).to.equal('GameToken')
      expect(await gameToken.symbol()).to.equal('GMTK')
      expect(await gameToken.decimals()).to.equal(18)
      expect(await gameToken.totalSupply()).to.equal(tokens(42069000000))
    })

    it('Should assign entire total supply to the contract', async () => {
      expect(await gameToken.balanceOf(gameToken.target)).to.equal(tokens(42069000000))
    })
  })

  describe('Transfer Tokens', () => {
    it('Should transfer tokens from the contract to user1', async () => {
      const amount = tokens(100)
      const gameTokenBalanceBefore = await gameToken.balanceOf(gameToken.target)
      const user1BalanceBefore = await gameToken.balanceOf(user1.address)

      await gameToken.transferFromContract(user1.address, amount);
    
      const user1BalanceAfter = await gameToken.balanceOf(user1.address)
      const gameTokenBalanceAfter = await gameToken.balanceOf(gameToken.target)
    
      expect(user1BalanceAfter).to.equal(user1BalanceBefore + amount)
      expect(gameTokenBalanceAfter).to.equal(gameTokenBalanceBefore - amount)

      const gameTokenBalanceAfterFirstAmount = await gameToken.balanceOf(gameToken.target)
      const user1BalanceAfterFirstAmount = await gameToken.balanceOf(user1.address)

      await gameToken.connect(user1).transfer(gameToken.target, amount)

      const user1FinalBalance = await gameToken.balanceOf(user1.address)
      const gameTokenFinalBalance = await gameToken.balanceOf(gameToken.target)

      expect(user1FinalBalance).to.equal(user1BalanceAfterFirstAmount - amount)
      expect(gameTokenFinalBalance).to.equal(gameTokenBalanceAfterFirstAmount + amount)
    }) 
  })

  describe('Distribute GMTK Tokens As Rewards', () => {
    it('Should allow users to claim rewards', async () => {
      const rewardIndex = 0 // Assuming rewardIndex 0 corresponds to 10 tokens
      await gameToken.connect(user1).claimToken(rewardIndex)
      const user1Balance = await gameToken.balanceOf(user1.address)
      const contractBalance = await gameToken.balanceOf(gameToken.target)

      expect(user1Balance).to.equal(tokens(10))
      expect(contractBalance).to.equal(tokens(42068999990)) // Total supply - rewarded amount
    })
  })
})
