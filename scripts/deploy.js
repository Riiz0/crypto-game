// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, upgrades } = require("hardhat");

async function main() {
  // Define deployer account
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with account: ${deployer.address}`);

  // Deploy GameToken
  const GameToken = await ethers.getContractFactory("GameToken");
  const gameToken = await upgrades.deployProxy(GameToken, []);
  await gameToken.deployed();
  console.log(`GameToken deployed to address: ${gameToken.address}`);

  // Deploy GameTicket
  const GameTicket = await ethers.getContractFactory("GameTicket");
  const gameTicket = await upgrades.deployProxy(GameTicket, []);
  await gameTicket.deployed();
  console.log(`GameTicket deployed to address: ${gameTicket.address}`);

  // Deploy GameNFTCollection
  const GameNFTCollection = await ethers.getContractFactory("GameNFTCollection");
  const gameNFTCollection = await upgrades.deployProxy(GameNFTCollection, []);
  await gameNFTCollection.deployed();
  console.log(`GameNFTCollection deployed to address: ${gameNFTCollection.address}`);

  // Deploy LeaderboardContract
  const LeaderboardContract = await ethers.getContractFactory("LeaderboardContract");
  const leaderboardContract = await upgrades.deployProxy(LeaderboardContract, []);
  await leaderboardContract.deployed();
  console.log(`LeaderboardContract deployed to address: ${leaderboardContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
