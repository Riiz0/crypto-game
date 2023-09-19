const { ethers } = require("hardhat");

async function main() {
  // Define deployer account
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with account: ${deployer.address}`);

  // Replace these addresses with the addresses of your deployed contracts
  const gameTokenAddress = "YOUR_GAME_TOKEN_ADDRESS";
  const gameTicketAddress = "YOUR_GAME_TICKET_ADDRESS";
  const gameNFTCollectionAddress = "YOUR_GAME_NFT_COLLECTION_ADDRESS";

  // Deploy RewardDistribution
  const RewardDistribution = await ethers.getContractFactory("RewardDistribution");
  const rewardDistribution = await RewardDistribution.deploy(
    gameTokenAddress,
    gameTicketAddress,
    gameNFTCollectionAddress
  );
  await rewardDistribution.waitForDeployment();
  console.log(`RewardDistribution deployed to address: ${rewardDistribution.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
