const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GameTicket contract", function () {
  let gameTicket;
  let owner;
  let user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    // Deploy the GameTicket contract
    const GameTicket = await ethers.getContractFactory("GameTicket");
    gameTicket = await GameTicket.deploy();
    await gameTicket.deployed();
  });

  it("Should deploy the GameTicket contract", async function () {
    expect(gameTicket.address).to.not.equal(0);
  });

  it("Should have the correct name and symbol", async function () {
    expect(await gameTicket.name()).to.equal("GameTicket");
    expect(await gameTicket.symbol()).to.equal("GMTT");
  });

  it("Should mint tickets to the owner", async function () {
    const initialBalance = await gameTicket.balanceOf(owner.address);
    expect(initialBalance).to.equal(0); // Initially, owner has 0 tickets

    const mintAmount = ethers.utils.parseUnits("100", 18);
    await gameTicket.connect(owner).mintTickets(owner.address, mintAmount);

    const newBalance = await gameTicket.balanceOf(owner.address);
    expect(newBalance).to.equal(mintAmount);
  });

  it("Should allow burning tickets", async function () {
    const initialBalance = await gameTicket.balanceOf(user.address);
    expect(initialBalance).to.equal(0); // Initially, user has 0 tickets

    const mintAmount = ethers.utils.parseUnits("100", 18);
    await gameTicket.connect(owner).mintTickets(user.address, mintAmount);

    const userBalance = await gameTicket.balanceOf(user.address);
    expect(userBalance).to.equal(mintAmount);

    const burnAmount = ethers.utils.parseUnits("50", 18);
    await gameTicket.connect(user).burnTickets(burnAmount);

    const newUserBalance = await gameTicket.balanceOf(user.address);
    expect(newUserBalance).to.equal(mintAmount.sub(burnAmount));
  });

  it("Should allow distributing GMTT Tickets as rewards", async function () {
    const rewardIndex = 4; // Assuming 10 GMTT Tickets reward
    const rewardAmount = ethers.utils.parseUnits("10", 18);

    // Transfer some tokens to the contract
    await gameTicket.connect(owner).mintTickets(gameTicket.address, rewardAmount);

    // Owner distributes GMTT Tickets as a reward
    await gameTicket.connect(owner).distributeGMTTTickets(rewardIndex);

    // Check owner's balance
    const ownerBalance = await gameTicket.balanceOf(owner.address);
    expect(ownerBalance).to.equal(0);

    // Check contract's balance (should have decreased)
    const contractBalance = await gameTicket.balanceOf(gameTicket.address);
    expect(contractBalance).to.equal(0);

    // Check user's balance (should have increased)
    const userBalance = await gameTicket.balanceOf(user.address);
    expect(userBalance).to.equal(rewardAmount);
  });
});
