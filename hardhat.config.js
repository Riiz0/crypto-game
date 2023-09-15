require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19", // Specify your desired Solidity version
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Update the port if needed (default is 8545)
    },
    // Add more network configurations if necessary
  },
  // Other Hardhat configurations
};
