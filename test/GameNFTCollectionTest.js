const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('GameNFTCollection', () => {
  let gameNFTCollection, deployer, user1, user2;
  const initialMintingDate = Math.floor(Date.now() / 1000);

  before(async () => {
    const GameNFTCollection = await ethers.getContractFactory('GameNFTCollection');
    gameNFTCollection = await GameNFTCollection.deploy(initialMintingDate);
    await gameNFTCollection.waitForDeployment();

    console.log(`Contract Address: ${gameNFTCollection.target}`)

    accounts = await ethers.getSigners()
    deployer = accounts[0]
    user1 = accounts[1]
    user2 = accounts[2]
  });

  describe('Deployment', () => {
    it('Should have the correct name, symbol, and initial minting date', async () => {
      expect(await gameNFTCollection.name()).to.equal('GameNFTCollection');
      expect(await gameNFTCollection.symbol()).to.equal('GNFT');
      expect(await gameNFTCollection.mintingDate()).to.equal(initialMintingDate);
    });
  });

  describe('setMintingDate', () => {
    it('Should allow the deployer to update the minting date', async () => {
      const newMintingDate = initialMintingDate + 86400; // Adding 1 day
      await gameNFTCollection.setMintingDate(newMintingDate);
      expect(await gameNFTCollection.mintingDate()).to.equal(newMintingDate);
    });

    it('Should not allow non-deployers to update the minting date', async () => {
      const newMintingDate = initialMintingDate + 86400; // Adding 1 day
      await expect(gameNFTCollection.connect(user1).setMintingDate(newMintingDate)).to.be.revertedWith(
        'Ownable: caller is not the deployer'
      );
    });
  });

  describe('safeMint', () => {
    it('Should allow the deployer to safely mint an NFT', async () => {
      await expect(gameNFTCollection.safeMint()).to.emit(gameNFTCollection, 'NFTMinted');
    });

    it('Should not allow non-deployers to mint NFTs', async () => {
      await expect(gameNFTCollection.connect(user1).safeMint()).to.be.revertedWith('Ownable: caller is not the deployer');
    });

    it('Should not allow minting before the minting date', async () => {
      const futureDate = initialMintingDate + 86400; // Adding 1 day
      await gameNFTCollection.setMintingDate(futureDate);
      await expect(gameNFTCollection.safeMint()).to.be.revertedWith('Minting is not yet available');
    });
  });

  describe('mintNFT', () => {
    it('Should allow the deployer to mint an NFT on behalf of a user', async () => {
      await expect(gameNFTCollection.mintNFT(user1.address)).to.emit(gameNFTCollection, 'NFTMinted');
    });

    it('Should not allow non-deployers to mint NFTs on behalf of users', async () => {
      await expect(gameNFTCollection.connect(user1).mintNFT(user2.address)).to.be.revertedWith(
        'Ownable: caller is not the deployer'
      );
    });

    it('Should not allow minting before the minting date', async () => {
      const futureDate = initialMintingDate + 86400; // Adding 1 day
      await gameNFTCollection.setMintingDate(futureDate);
      await expect(gameNFTCollection.mintNFT(user1.address)).to.be.revertedWith(
        'Minting is not yet available'
      );
    });
  });

  describe('tokenURI', () => {
    it('Should return the correct token URI', async () => {
      const tokenId = 0; // Assuming you minted at least one NFT
      const tokenURI = await gameNFTCollection.tokenURI(tokenId);
      // Add your own expectations for the tokenURI based on your contract's implementation
      expect(tokenURI).to.equal(`YourExpectedURI/${tokenId}`);
    });
  });
});
