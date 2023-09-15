// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
  // Define deployer account
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with account: ${deployer.address}`);

  // Deploy GameToken
  const GameToken = await ethers.getContractFactory("GameToken");
  const gameToken = await GameToken.deploy();
  await gameToken.waitForDeployment();
  console.log(`GameToken deployed to address: ${gameToken.target}`);

  // Deploy GameTicket
  const GameTicket = await ethers.getContractFactory("GameTicket");
  const gameTicket = await GameTicket.deploy();
  await gameTicket.waitForDeployment();
  console.log(`GameTicket deployed to address: ${gameTicket.target}`);

  // Deploy GameNFTCollection
  const initialMintingDate = 0; // Replace with your desired initial minting date
  const GameNFTCollection = await ethers.getContractFactory("GameNFTCollection");
  const gameNFTCollection = await GameNFTCollection.deploy(initialMintingDate);
  await gameNFTCollection.waitForDeployment();
  console.log(`GameNFTCollection deployed to address: ${gameNFTCollection.target}`);

  // Deploy LeaderBoardContract
  const LeaderboardContract = await ethers.getContractFactory("LeaderboardContract");
  const leaderboardContract = await LeaderboardContract.deploy();
  await leaderboardContract.waitForDeployment();
  console.log(`LeaderboardContract deployed to address: ${leaderboardContract.target}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
