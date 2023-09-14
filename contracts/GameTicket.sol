// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameTicket is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("GameTicket", "GMTT") {}

    function mintTickets(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Function to burn GameTickets for playing the game
    function burnTickets(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Insufficient GameTickets");

        _burn(msg.sender, amount);
    }

    // Function to distribute GMTT Tickets as rewards
    function distributeGMTTTickets(uint256 rewardIndex) external onlyOwner {
        require(rewardIndex >= 4 && rewardIndex < 8, "Invalid reward index for GMTT Tickets");

        uint256 rewardAmount;

        if (rewardIndex == 4) {
            // 10 GMTT Tickets
            rewardAmount = 10 * (10**uint256(decimals()));
        } else if (rewardIndex == 5) {
            // 25 GMTT Tickets
            rewardAmount = 25 * (10**uint256(decimals()));
        } else if (rewardIndex == 6) {
            // 50 GMTT Tickets
            rewardAmount = 50 * (10**uint256(decimals()));
        } else if (rewardIndex == 7) {
            // 100 GMTT Tickets
            rewardAmount = 100 * (10**uint256(decimals()));
        } else {
            revert("Invalid reward index");
        }

        require(balanceOf(address(this)) >= rewardAmount, "Contract balance is insufficient");

        _transfer(address(this), msg.sender, rewardAmount);
    }
}
