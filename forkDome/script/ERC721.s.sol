// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/ERC721.sol";

contract ERC721Script is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
        new ForkDome();
    }
}
