// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameNFTCollection is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public mintingDate;

    constructor(uint256 _initialMintingDate) ERC721("GameNFTCollection", "GNFT") {
        mintingDate = _initialMintingDate;
    }

    // Function to update the minting date by the contract owner.
    function setMintingDate(uint256 _newMintingDate) public onlyOwner {
        mintingDate = _newMintingDate;
    }

    // Event for NFT minting
    event NFTMinted(address indexed owner, uint256 tokenId);

    function safeMint() public onlyOwner {
        require(block.timestamp >= mintingDate, "Minting is not yet available");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        
        emit NFTMinted(msg.sender, tokenId); // Emit the NFTMinted event
    }

    // Function to mint an NFT on behalf of a user (to be called by the RewardDistribution Contract)
    function mintNFT(address to) external onlyOwner returns (uint256) {
        require(block.timestamp >= mintingDate, "Minting is not yet available");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        emit NFTMinted(to, tokenId); // Emit the NFTMinted event

        return tokenId; // Return the minted tokenId
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
