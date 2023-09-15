const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GameToken Contract", function () {
  let gameToken, accounts, owner, user1, user2
  
  beforeEach(async () => 
  {
    accounts = await ethers.getSigners()
    owner = accounts[0]
    user1 = accounts[1]
    user2 = accounts[3]

    //Deploy GameToken For Initial Supply and Minting
    const deployGameToken = await ethers.getContractFactory("GameToken")
    gameToken = await deployGameToken.Deploy()
    await gameToken.deployed()
  })

  //Check Contract Owner Balance
  describe("Check Contract Owner Balance", () => {
    it("Contract Should Not Have a Balance Of Zero", async () => {
      expect(await gameToken.balanceOf(owner.address)).to.be.gt(0);
    });

    it("Contract Should Have Correct Name and Symbol", async () => {
      expect(await gameToken.name()).to.equal("GameToken")
      expect(await gameToken.symbol()).to.equal("GMTK")
    })

    it("Token Contract Should Mint To Owner", async () => {
      const initialBalance = await gameToken.balanceOf(owner.address)
      expect(initialBalance).to.equal(42069000000 * (10 ** 18))
    })

    it("Check Balance of User1 After Receiving Tokens From Contract Owner", async () => {
      const transferAmount = ethers.parseEther("100")

      await gameToken.transfer(user1.address, transferAmount)
      const user1Balance = await gameToken.balanceOf(user1.address)
      expect(user1Balance).to.equal(transferAmount)
    })

    it("Send Tokens Between User1 and User2", async () => {
      const sentAmount = ethers.parseEther("25")

      await gameToken.connect(user1).transfer(user2.address, sendAmount);
      const user2Balance = await gameToken.balanceOf(user2.address)
      expect(user2Balance).to.equal(sentAmount)
    })
  })

  // Minting Restrictions
  describe("Minting Restrictions", () => {
    let initialBalance;
    let user1BurnBalance;

    beforeEach(async () => {
      initialBalance = await gameToken.balanceOf(owner.address);
      expect(initialBalance).to.equal(42069000000 * (10 ** 18));
    });

    it("Token Burn By Owner Contract", async () => {
      const ownerBurnAmount = ethers.parseEther("1000");

      await gameToken.burn(owner.address, ownerBurnAmount);
      const updatedBalance = await gameToken.balanceOf(owner.address);
      expect(updatedBalance).to.equal(initialBalance.sub(ownerBurnAmount));
    });

    it("Token Burn By Non-Owner", async () => {
      const transferTokensForBurn = ethers.parseEther("100");
      const nonOwnerBurnAmount = ethers.parseEther("100");

      await gameToken.transfer(user1.address, transferTokensForBurn);
      user1BurnBalance = await gameToken.balanceOf(user1.address);
      expect(user1BurnBalance).to.equal(transferTokensForBurn);

      await gameToken.burn(user1.address, nonOwnerBurnAmount);
      const updatedUser1Balance = await gameToken.balanceOf(user1.address);
      expect(updatedUser1Balance).to.equal(transferTokensForBurn.sub(nonOwnerBurnAmount));
    });
  });

  // Reward Claiming
  describe("Reward Claiming", () => {
    let initialBalance;

    beforeEach(async () => {
      initialBalance = await gameToken.balanceOf(owner.address);
      expect(initialBalance).to.equal(42069000000 * (10 ** 18));
    });

    it("Call Function 'claimReward' with Valid Reward Indices", async () => {
      const rewardIndex = 0; // Assuming 10 GMTK Tokens reward
      const rewardAmount = ethers.parseEther("10");

      const user1BalanceBefore = await gameToken.balanceOf(user1.address);
      await gameToken.claimReward(rewardIndex);
      const user1BalanceAfter = await gameToken.balanceOf(user1.address);

      // Check that the user's balance increased by the expected reward amount
      expect(user1BalanceAfter.sub(user1BalanceBefore)).to.equal(rewardAmount);

      // Verify that the 'RewardClaimed' event is emitted
      const tx = await gameToken.claimReward(rewardIndex);
      const receipt = await tx.wait();
      const event = receipt.events.find((e) => e.event === "RewardClaimed");

      // Check that the event was emitted with the correct parameters
      expect(event.args.user).to.equal(user1.address);
      expect(event.args.rewardAmount).to.equal(rewardAmount);
      expect(event.args.rewardIndex).to.equal(rewardIndex);
    });

    it("Call Function 'claimReward' with Invalid Reward Indices", async () => {
      try {
        await gameToken.claimReward(-1); // An invalid reward index
        expect.fail("Expected an error but didn't get one");
      } catch (error) {
        expect(error.message).to.contain("Invalid reward index");
      }
    });
  });

  // Reward Claiming Token Contract Insufficient Token Amount
  describe("Reward Claiming Token Contract Insufficient Token Amount", () => {
    it("Test Claiming Rewards When The Contract Balance Is Insufficient", async () => {
      // Reduce the contract's balance to an insufficient level (less than rewardAmount)
      const insufficientBalance = ethers.parseEther("1");
      const rewardIndex = 0; // Assuming 10 GMTK Tokens reward
      
      // Set the contract's balance to be insufficient
      await gameToken.transfer(user1.address, insufficientBalance);

      // Attempt to claim rewards with valid rewardIndices
      try {
        await gameToken.claimReward(rewardIndex);
        expect.fail("Expected an error but didn't get one");
      } catch (error) {
        expect(error.message).to.contain("Contract balance is insufficient");
      }
    });
  });
})
