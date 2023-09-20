// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./GameToken.sol"; // Import GameToken contract
import "./GameTicket.sol"; // Import GameTicket contract
import "./GameNFTCollection.sol"; // Import GameNFT contract
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardDistribution is Ownable {
    GameToken public gameToken;
    GameTicket public gameTicket;
    GameNFTCollection public gameNFTCollection;

    constructor(address _gameToken, address _gameTicket, address _gameNFTCollection) {
        gameToken = GameToken(_gameToken);
        gameTicket = GameTicket(_gameTicket);
        gameNFTCollection = GameNFTCollection(_gameNFTCollection);
    }

    // Events for reward claims
    event TokensClaimed(address indexed user, uint256 rewardIndex, uint256 amount);
    event TicketsClaimed(address indexed user, uint256 rewardIndex, uint256 amount);
    event NFTClaimed(address indexed user, uint256 rewardIndex, uint256 tokenId);

    // Reward distribution functions
    function claimTokenReward(uint256 rewardIndex) external {
        // Implement reward distribution logic with GameToken
        if (rewardIndex == 0) {
            // Transfer 10 $GMTK Tokens to the user 11.5% chance
            gameToken.transfer(msg.sender, 10 * (10**uint256(gameToken.decimals())));
            emit TokensClaimed(msg.sender, rewardIndex, 10 * (10**uint256(gameToken.decimals())));

        } else if (rewardIndex == 1) {
            // Transfer 25 $GMTK Tokens to the user 6.5% chance
            gameToken.transfer(msg.sender, 25 * (10**uint256(gameToken.decimals())));
            emit TokensClaimed(msg.sender, rewardIndex, 25 * (10**uint256(gameToken.decimals())));

        } else if (rewardIndex == 2) {
            // Transfer 50 $GMTK Tokens to the user 3.5% chance
            gameToken.transfer(msg.sender, 50 * (10**uint256(gameToken.decimals())));
            emit TokensClaimed(msg.sender, rewardIndex, 50 * (10**uint256(gameToken.decimals())));

        } else if (rewardIndex == 3) {
            // Transfer 100 $GMTK Tokens to the user 1.5% chance
            gameToken.transfer(msg.sender, 100 * (10**uint256(gameToken.decimals())));
            emit TokensClaimed(msg.sender, rewardIndex, 100 * (10**uint256(gameToken.decimals())));

        } else {
            // Handle invalid reward index
            revert("Invalid reward index for GMTK Tokens");
        }
    }

    function claimTicketReward(uint256 rewardIndex) external {
        // Implement reward distribution logic with GameTicket
        if (rewardIndex == 4) {
            // 10 GMTT Tickets
            uint256 rewardAmount = 10 * (10**uint256(gameTicket.decimals()));

            // Mint 10 GMTT Tickets to the user 11.5% chance
            gameTicket.mintTickets(msg.sender, rewardAmount);
            emit TicketsClaimed(msg.sender, rewardIndex, rewardAmount);

        } else if (rewardIndex == 5) {
            // 25 GMTT Tickets
            uint256 rewardAmount = 25 * (10**uint256(gameTicket.decimals()));
            
            // Mint 25 GMTT Tickets to the user 6.5% chance
            gameTicket.mintTickets(msg.sender, rewardAmount);
            emit TicketsClaimed(msg.sender, rewardIndex, rewardAmount);

        } else if (rewardIndex == 6) {
            // 50 GMTT Tickets
            uint256 rewardAmount = 50 * (10**uint256(gameTicket.decimals()));
            
            // Mint 50 GMTT Tickets to the user 3.5% chance
            gameTicket.mintTickets(msg.sender, rewardAmount);
            emit TicketsClaimed(msg.sender, rewardIndex, rewardAmount);

        } else if (rewardIndex == 7) {
            // 100 GMTT Tickets
            uint256 rewardAmount = 100 * (10**uint256(gameTicket.decimals()));
            
            // Mint 100 GMTT Tickets to the user 1.5% chance
            gameTicket.mintTickets(msg.sender, rewardAmount);
            emit TicketsClaimed(msg.sender, rewardIndex, rewardAmount);

        } else {
            // Handle invalid reward index
            revert("Invalid reward index for GMTT Tickets");
        }
    }

    function claimNFTReward(uint256 rewardIndex, string memory uri) external {
        // Implement reward distribution logic with GameNFTCollection
        if (rewardIndex == 8) {
            // Mint 1 random GameNFT to the user with the specified URI and 0.5% chance
            uint256 tokenId = gameNFTCollection.mintNFTReward(msg.sender, uri);
            emit NFTClaimed(msg.sender, rewardIndex, tokenId);
        } else {
            // Handle invalid reward index
            revert("Invalid reward index for NFT");
        }
    }
}
