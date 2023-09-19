// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Leaderboard is Ownable {
    struct Player {
        uint256 totalEnemiesKilled;
        uint256 highestLevelCompleted;
    }

    mapping(address => Player) public players;
    address[] public playerAddresses; // To maintain a list of player addresses

    event ProgressRecorded(address indexed player, uint256 totalEnemiesKilled, uint256 highestLevelCompleted);

    // Record player progress
    function recordProgress(uint256 _totalEnemiesKilled, uint256 _highestLevelCompleted) external {
        require(_totalEnemiesKilled > 0 || _highestLevelCompleted > 0, "Progress should be greater than zero");
        Player storage player = players[msg.sender];
        player.totalEnemiesKilled += _totalEnemiesKilled;
        if (_highestLevelCompleted > player.highestLevelCompleted) {
            player.highestLevelCompleted = _highestLevelCompleted;
        }

        // If it's the player's first time recording progress, add their address to the list
        if (playerAddresses.length == 0 || playerAddresses[playerAddresses.length - 1] != msg.sender) {
            playerAddresses.push(msg.sender);
        }

        emit ProgressRecorded(msg.sender, player.totalEnemiesKilled, player.highestLevelCompleted);
    }

    // Get the number of players on the leaderboard
    function getPlayerCount() external view returns (uint256) {
        return playerAddresses.length;
    }

    // Get player information by index (for leaderboard display)
    function getPlayerInfo(uint256 index) external view returns (address, uint256, uint256) {
        require(index < playerAddresses.length, "Index out of range");
        address playerAddress = playerAddresses[index];
        Player memory player = players[playerAddress];
        return (playerAddress, player.totalEnemiesKilled, player.highestLevelCompleted);
    }
}
