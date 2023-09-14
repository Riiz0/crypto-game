const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LeaderboardContract", function () {
  let leaderboard;
  let owner;
  let user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    // Deploy the LeaderboardContract
    const LeaderboardContract = await ethers.getContractFactory("LeaderboardContract");
    leaderboard = await LeaderboardContract.deploy();
    await leaderboard.deployed();
  });

  it("Should deploy the LeaderboardContract contract", async function () {
    expect(leaderboard.address).to.not.equal(0);
  });

  it("Should record player progress and update the leaderboard", async function () {
    const totalEnemiesKilled = 100;
    const highestLevelCompleted = 5;

    await leaderboard.connect(user).recordProgress(totalEnemiesKilled, highestLevelCompleted);

    const playerInfo = await leaderboard.players(user.address);
    expect(playerInfo.totalEnemiesKilled).to.equal(totalEnemiesKilled);
    expect(playerInfo.highestLevelCompleted).to.equal(highestLevelCompleted);
  });

  it("Should update progress for the same player", async function () {
    const initialTotalEnemiesKilled = 50;
    const initialHighestLevelCompleted = 3;
    const newTotalEnemiesKilled = 75;
    const newHighestLevelCompleted = 4;

    await leaderboard.connect(user).recordProgress(initialTotalEnemiesKilled, initialHighestLevelCompleted);
    await leaderboard.connect(user).recordProgress(newTotalEnemiesKilled, newHighestLevelCompleted);

    const playerInfo = await leaderboard.players(user.address);
    expect(playerInfo.totalEnemiesKilled).to.equal(initialTotalEnemiesKilled + newTotalEnemiesKilled);
    expect(playerInfo.highestLevelCompleted).to.equal(newHighestLevelCompleted);
  });

  it("Should not allow recording zero progress", async function () {
    await expect(leaderboard.connect(user).recordProgress(0, 0)).to.be.revertedWith(
      "Progress should be greater than zero"
    );
  });

  it("Should retrieve the player count", async function () {
    const playerCount = await leaderboard.getPlayerCount();
    expect(playerCount).to.equal(0); // Initially, there are no players

    await leaderboard.connect(user).recordProgress(100, 5);
    const updatedPlayerCount = await leaderboard.getPlayerCount();
    expect(updatedPlayerCount).to.equal(1); // There should be one player now
  });

  it("Should retrieve player information from the leaderboard", async function () {
    await leaderboard.connect(user).recordProgress(100, 5);
    await leaderboard.connect(owner).recordProgress(200, 7);

    const playerCount = await leaderboard.getPlayerCount();
    expect(playerCount).to.equal(2);

    const [userAddress, userTotalEnemiesKilled, userHighestLevelCompleted] = await leaderboard.getPlayerInfo(0);
    expect(userAddress).to.equal(user.address);
    expect(userTotalEnemiesKilled).to.equal(100);
    expect(userHighestLevelCompleted).to.equal(5);

    const [ownerAddress, ownerTotalEnemiesKilled, ownerHighestLevelCompleted] = await leaderboard.getPlayerInfo(1);
    expect(ownerAddress).to.equal(owner.address);
    expect(ownerTotalEnemiesKilled).to.equal(200);
    expect(ownerHighestLevelCompleted).to.equal(7);
  });
});
