// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameToken is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("GameToken", "GMTK") 
    {
        uint256 totalSupply = 42069000000 * (10**uint256(decimals()));
        _mint(address(this), totalSupply);
    }

    event RewardClaimed(address indexed user, uint256 rewardAmount, uint256 rewardIndex);

    function claimReward(uint256 rewardIndex) external {
        require(rewardIndex >= 0 && rewardIndex < 4, "Invalid reward index");

        uint256 rewardAmount;

        if (rewardIndex == 0) {
            rewardAmount = 10 * (10**uint256(decimals())); // 10 GMTK Tokens
        } else if (rewardIndex == 1) {
            rewardAmount = 25 * (10**uint256(decimals())); // 25 GMTK Tokens
        } else if (rewardIndex == 2) {
            rewardAmount = 50 * (10**uint256(decimals())); // 50 GMTK Tokens
        } else if (rewardIndex == 3) {
            rewardAmount = 100 * (10**uint256(decimals())); // 100 GMTK Tokens
        } else {
            revert("Invalid reward index");
        }

        require(balanceOf(address(this)) >= rewardAmount, "Contract balance is insufficient");

        _transfer(address(this), msg.sender, rewardAmount);

        emit RewardClaimed(msg.sender, rewardAmount, rewardIndex);
    }

    /* ONLY FOR TESTING PURPOSES / REMOVE FOR ACTUAL DEPLOYMENT */
    /*                                                          */
    /*                                                          */
    function transferFromContract(address to, uint256 amount) external onlyOwner {
    _transfer(address(this), to, amount);
}
    /*                                                          */
    /*                                                          */
    
    function Burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
