const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GameToken contract", function () {
  let gameToken;
  let owner;
  let user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    // Deploy the GameToken contract
    const GameToken = await ethers.getContractFactory("GameToken");
    gameToken = await GameToken.deploy();
    await gameToken.deployed();
  });

  it("Should deploy the GameToken contract", async function () {
    expect(gameToken.address).to.not.equal(0);
  });

  it("Should have the correct name and symbol", async function () {
    expect(await gameToken.name()).to.equal("GameToken");
    expect(await gameToken.symbol()).to.equal("GMTK");
  });

  it("Should mint tokens to the owner", async function () {
    const initialBalance = await gameToken.balanceOf(owner.address);
    expect(initialBalance).to.equal(42069000000 * (10 ** 18)); // Initial total supply
  });

  it("Should allow transferring tokens between accounts", async function () {
    const transferAmount = ethers.utils.parseEther("100");

    // Transfer tokens from owner to user
    await gameToken.transfer(user.address, transferAmount);
    const userBalance = await gameToken.balanceOf(user.address);
    expect(userBalance).to.equal(transferAmount);

    // Check owner's balance
    const ownerBalance = await gameToken.balanceOf(owner.address);
    expect(ownerBalance).to.equal(42069000000 * (10 ** 18) - transferAmount);
  });

  it("Should allow users to claim rewards", async function () {
    const rewardIndex = 0; // Assuming 10 GMTK Tokens reward
    const rewardAmount = ethers.utils.parseEther("10");

    // Transfer some tokens to the contract
    await gameToken.transfer(gameToken.address, rewardAmount);

    // User claims the reward
    await gameToken.connect(user).claimReward(rewardIndex);

    // Check user's balance
    const userBalance = await gameToken.balanceOf(user.address);
    expect(userBalance).to.equal(rewardAmount);

    // Check contract's balance (should have decreased)
    const contractBalance = await gameToken.balanceOf(gameToken.address);
    expect(contractBalance).to.equal(0);
  });
});
