pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import 'src/ERC721.sol';
import "@openzeppelin/contracts/utils/Strings.sol";

contract ERC721Test is Test {
    ForkDome forkDome;
    address noah = address(0x1);
    address sofia = address(0x2);


    function setUp() public {
      forkDome = new ForkDome();
    }

    function testMint() public {
      forkDome.mint(noah, "testhash");
      address owner_of = forkDome.ownerOf(0);
      assertEq(noah, owner_of);
    }

    function testTokenURI() public {
        // vm.expectRevert("Mint at least 1 token");
        string memory uri = "hammer";

        forkDome.mint(sofia, uri);
        assertEq(forkDome.tokenURI(0), uri);

        string memory uri2 = "sword";
        forkDome.mint(noah, uri2);

        assertEq(forkDome.tokenURI(1), uri2);

    }

    function testTransferToken() public {
        forkDome.mint(sofia, "zero");
        vm.startPrank(sofia);
        forkDome.safeTransferFrom(sofia, noah, 0);
        assertEq(noah, forkDome.ownerOf(0));
    }

    function testGetTokens() public {
      forkDome.mint(sofia, "zero");
      forkDome.mint(sofia, "one");
      forkDome.mint(noah, "two");
      forkDome.mint(sofia, "three");
      forkDome.mint(sofia, "four");
      forkDome.mint(sofia, "five");
      forkDome.mint(sofia, "six");

      emit log(Strings.toString(forkDome.getTokenURIByOwner(sofia, 0).length));
      emit log(Strings.toString(forkDome.getTokenURIByOwner(sofia, 1).length));

      for (uint256 i = 0; i < forkDome.getTokenURIByOwner(sofia, 0).length; i++) {
        emit log(forkDome.getTokenURIByOwner(sofia, 0)[i]);
      }
       for (uint256 i = 0; i < forkDome.getTokenURIByOwner(sofia, 1).length; i++) {
        emit log(forkDome.getTokenURIByOwner(sofia, 1)[i]);
      }
            for (uint256 i = 0; i < forkDome.getTokenURIByOwner(sofia, 2).length; i++) {
        emit log(forkDome.getTokenURIByOwner(sofia, 2)[i]);
      }

      assertEq("zero", forkDome.getTokenURIByOwner(sofia, 0)[0]);
      assertEq("one", forkDome.getTokenURIByOwner(sofia, 0)[1]);
      assertEq("three", forkDome.getTokenURIByOwner(sofia, 0)[2]);
     
      assertEq("two", forkDome.getTokenURIByOwner(noah, 0)[0]);
      

    }
}