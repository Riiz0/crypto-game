const { ethers } = require("hardhat");

async function main() {
  // Define deployer account
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with account: ${deployer.address}`);

  // Deploy GameNFTCollection
  const initialMintingDate = 0; // Replace with your desired initial minting date
  const GameNFTCollection = await ethers.getContractFactory("GameNFTCollection");
  const gameNFTCollection = await GameNFTCollection.deploy(initialMintingDate);
  await gameNFTCollection.waitForDeployment();
  console.log(`GameNFTCollection deployed to address: ${gameNFTCollection.target}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
