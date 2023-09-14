const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GameNFTCollection contract", function () {
  let gameNFT;
  let owner;
  let user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    // Deploy the GameNFTCollection contract
    const GameNFTCollection = await ethers.getContractFactory("GameNFTCollection");
    gameNFT = await GameNFTCollection.deploy(0); // Initial minting date set to 0
    await gameNFT.deployed();
  });

  it("Should deploy the GameNFTCollection contract", async function () {
    expect(gameNFT.address).to.not.equal(0);
  });

  it("Should have the correct name and symbol", async function () {
    expect(await gameNFT.name()).to.equal("GameNFTCollection");
    expect(await gameNFT.symbol()).to.equal("GNFT");
  });

  it("Should allow the owner to set the minting date", async function () {
    const newMintingDate = Math.floor(Date.now() / 1000) + 86400; // Set minting date to tomorrow

    await gameNFT.connect(owner).setMintingDate(newMintingDate);

    const updatedMintingDate = await gameNFT.mintingDate();
    expect(updatedMintingDate).to.equal(newMintingDate);
  });

  it("Should prevent non-owners from setting the minting date", async function () {
    const newMintingDate = Math.floor(Date.now() / 1000) + 86400; // Set minting date to tomorrow

    await expect(gameNFT.connect(user).setMintingDate(newMintingDate)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("Should allow the owner to safely mint NFTs", async function () {
    const mintingDate = Math.floor(Date.now() / 1000) + 86400; // Set minting date to tomorrow
    await gameNFT.connect(owner).setMintingDate(mintingDate);

    const initialBalance = await gameNFT.balanceOf(owner.address);
    expect(initialBalance).to.equal(0); // Initially, owner has 0 NFTs

    await gameNFT.connect(owner).safeMint();

    const newBalance = await gameNFT.balanceOf(owner.address);
    expect(newBalance).to.equal(1); // Owner should have 1 NFT
  });

  it("Should prevent non-owners from safely minting NFTs", async function () {
    const mintingDate = Math.floor(Date.now() / 1000) + 86400; // Set minting date to tomorrow
    await gameNFT.connect(owner).setMintingDate(mintingDate);

    await expect(gameNFT.connect(user).safeMint()).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });
});
