// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameTicket is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("GameTicket", "GMTT") {}

    // Event for token transfers
    event TokenTransfer(address indexed from, address indexed to, uint256 value);

    // Function to mint gameTickets and distribute
    function mintTickets(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Function to distribute GameTickets earned during gameplay
    function distributeTickets(address player, uint256 amount) external onlyOwner {
        // This function allows for the distribution of GameTickets to players based on their in-game achievements
        _transfer(owner(), player, amount);
        emit TokenTransfer(owner(), player, amount);
    }

    // Function for anyone to burn GameTickets
    function burnTickets(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Insufficient GameTickets");

        _burn(msg.sender, amount);
        emit TokenTransfer(msg.sender, address(0), amount);
    }

    // Function to pay the roulette game entry with a fixed cost of 100 GameTickets
    function payEntry() external {
        uint256 ticketCost = 100; // Fixed entry fee

        require(balanceOf(msg.sender) >= ticketCost, "Insufficient GameTickets");

        // Deduct tickets from the player
        _burn(msg.sender, ticketCost);
        emit TokenTransfer(msg.sender, owner(), ticketCost);
    }
}
