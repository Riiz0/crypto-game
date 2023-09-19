const { ethers } = require("hardhat");

async function main() {
  // Define deployer account
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with account: ${deployer.address}`);

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
