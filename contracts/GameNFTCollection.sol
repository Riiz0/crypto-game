// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameNFTCollection is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public mintingDate;

    uint256 public constant TOTAL_SUPPLY = 6500;
    uint256 public constant SAFE_MINT_ALLOCATION = 5000;
    uint256 public constant REWARD_MINT_ALLOCATION = 1500;
    uint256 public constant MAX_MINT_PER_WALLET = 20;

    // Define rarities
    enum Rarity { Common, Rare, Epic, Legendary }

    // Define rarity weights (percentages)
    uint256 constant COMMON_WEIGHT = 61;
    uint256 constant RARE_WEIGHT = 24;
    uint256 constant EPIC_WEIGHT = 12;
    uint256 constant LEGENDARY_WEIGHT = 3;

    constructor(uint256 _initialMintingDate) ERC721("GameNFTCollection", "GNFT") {
        mintingDate = _initialMintingDate;
    }

    // Mapping to keep track of the number of NFTs minted by each wallet address
    mapping(address => uint256) private _mintedCounts;

    // Event for NFT minting
    event NFTMinted(address indexed owner, uint256 tokenId, Rarity rarity);

    // Function to update the minting date by the contract owner.
    function setMintingDate(uint256 _newMintingDate) public onlyOwner {
        require(msg.sender == owner(), "Ownable: caller is not the owner");
        mintingDate = _newMintingDate;
    }

    // Function for user to mint an NFT
    function safeMint(string memory uri) external {
        require(block.timestamp >= mintingDate, "Minting is not yet available");
        require(_mintedCounts[msg.sender] < MAX_MINT_PER_WALLET, "Exceeded max mint per wallet");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        // Determine the rarity based on random number and weights
        Rarity rarity = determineRarity();

        // Check if the allocation for regular minting has been reached
        require(tokenId < SAFE_MINT_ALLOCATION, "Exceeded Mint Allocation");

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        emit NFTMinted(msg.sender, tokenId, rarity);

        _mintedCounts[msg.sender]++;
        require(_tokenIdCounter.current() <= TOTAL_SUPPLY, "Exceeded total supply");
    }

    // Function to determine the rarity based on random number and weights
    function determineRarity() internal view returns (Rarity) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 100 + 1;

        if (randomNumber <= COMMON_WEIGHT) {
            return Rarity.Common;
        } else if (randomNumber <= COMMON_WEIGHT + RARE_WEIGHT) {
            return Rarity.Rare;
        } else if (randomNumber <= COMMON_WEIGHT + RARE_WEIGHT + EPIC_WEIGHT) {
            return Rarity.Epic;
        } else {
            return Rarity.Legendary;
        }
    }

    // Function to mint an NFT on behalf of a user (to be called by the RewardDistribution Contract)
    function mintNFTReward(address to, string memory uri) external onlyOwner returns (uint256) {
        require(block.timestamp >= mintingDate, "Minting is not yet available");
        require(_tokenIdCounter.current() < TOTAL_SUPPLY, "Exceeded total supply");

        // Check if the allocation for reward minting has been reached
        require(_tokenIdCounter.current() < SAFE_MINT_ALLOCATION + REWARD_MINT_ALLOCATION, "Exceeded Reward Mint Allocation");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        Rarity rarity = Rarity.Legendary; // Or you can use determineRarity() for rewards too
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit NFTMinted(msg.sender, tokenId, rarity);

        return tokenId; // Return the minted tokenId
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
