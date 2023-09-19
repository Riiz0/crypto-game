const { ethers } = require("hardhat");

async function main() {
  // Define deployer account
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with account: ${deployer.address}`);

  // Deploy GameTicket
  const GameTicket = await ethers.getContractFactory("GameTicket");
  const gameTicket = await GameTicket.deploy();
  await gameTicket.waitForDeployment();
  console.log(`GameTicket deployed to address: ${gameTicket.target}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
