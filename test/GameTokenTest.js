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
      expect(await gameToken.totalSupply()).to.equal(tokens(42069000000).toString())
    })

    it('Should assign entire total supply to the contract', async () => {
      expect(await gameToken.balanceOf(deployer.address)).to.equal(tokens(42069000000).toString())
    })
  })

  describe('Transfer Tokens', () => {
    it('Should transfer tokens from the contract to user1', async () => {
      const amount = tokens(1000)
      const gameTokenBalanceBefore = await gameToken.balanceOf(deployer.address)
      const user1BalanceBefore = await gameToken.balanceOf(user1.address)

      await gameToken.transfer(user1.address, amount)

      const user1BalanceAfter = await gameToken.balanceOf(user1.address)
      const gameTokenBalanceAfter = await gameToken.balanceOf(deployer.address)

      expect(user1BalanceAfter).to.equal(user1BalanceBefore + (amount))
      expect(gameTokenBalanceAfter).to.equal(gameTokenBalanceBefore - (amount))
    });

    it('Should allow user1 to send tokens to user2', async () => {
      const amount = tokens(500);
      const user1BalanceBefore = await gameToken.balanceOf(user1.address);
      const user2BalanceBefore = await gameToken.balanceOf(user2.address);
  
      await gameToken.connect(user1).transfer(user2.address, amount);
  
      const user1BalanceAfter = await gameToken.balanceOf(user1.address);
      const user2BalanceAfter = await gameToken.balanceOf(user2.address);
  
      expect(user1BalanceAfter).to.equal(user1BalanceBefore - (amount));
      expect(user2BalanceAfter).to.equal(user2BalanceBefore + (amount));
    });
  
    it('Should allow user2 to send tokens back to user1', async () => {
      const amount = tokens(250);
      const user1BalanceBefore = await gameToken.balanceOf(user1.address);
      const user2BalanceBefore = await gameToken.balanceOf(user2.address);
  
      await gameToken.connect(user2).transfer(user1.address, amount);
  
      const user1BalanceAfter = await gameToken.balanceOf(user1.address);
      const user2BalanceAfter = await gameToken.balanceOf(user2.address);
  
      expect(user1BalanceAfter).to.equal(user1BalanceBefore + (amount));
      expect(user2BalanceAfter).to.equal(user2BalanceBefore - (amount));
    });

    it('Should allow user1 to burn tokens', async () => {
      const amountToBurn = tokens(100);
      const user1BalanceBefore = await gameToken.balanceOf(user1.address);
    
      await gameToken.connect(user1).burn(amountToBurn);
    
      const user1BalanceAfter = await gameToken.balanceOf(user1.address);
    
      expect(user1BalanceAfter).to.equal(user1BalanceBefore - (amountToBurn));
    });
    
    it('Should emit a Burn event when burning tokens', async () => {
      const amountToBurn = tokens(100);
    
      await expect(gameToken.connect(user1).burn(amountToBurn))
        .to.emit(gameToken, 'Transfer')
        .withArgs(user1.address, '0x0000000000000000000000000000000000000000', amountToBurn);
    });        
  });
});
