// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameToken is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("GameToken", "GMTK") {
        uint256 totalSupply = 42069000000 * (10**uint256(decimals()));
        _mint(owner(), totalSupply); // Mint to the contract owner
    }

    // Emit an event for any token transfer (optional but recommended)
    event TokenTransfer(address indexed from, address indexed to, uint256 value);

    function transfer(address to, uint256 value) public override returns (bool) {
        super.transfer(to, value);
        emit TokenTransfer(msg.sender, to, value);
        return true;
    }

    function Burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
