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
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
