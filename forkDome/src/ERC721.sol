pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ForkDome is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    uint private constant maxPage = 10;

    constructor() ERC721("ForkDome", "FDM") {}

    function mint(address user, string memory tokenURI) public returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        _mint(user, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        _tokenIds.increment();
        return newItemId;
    }

    function getTokenURIByOwner(address user, int page) public view returns (string[maxPage] memory) {
        string[maxPage] memory tokens;
        uint count = 0;
        int curPage = 0;

        for (uint i = 0; i < _tokenIds.current(); i++) {
            if (ownerOf(i) == user) {
                tokens[count] = tokenURI(i);
                count++;
                if (count >= maxPage) {
                    if (curPage == page) {
                        return tokens;
                    } else {
                        curPage++;
                        count = 0;
                        for (uint j = 0; j < maxPage; j++) {
                            tokens[j] = "";
                        }
                    }
                }
            } 
        }
        
        if (curPage > page-1) {
            return tokens;
        } else {
            for (uint j = 0; j < maxPage; j++) {
                tokens[j] = "";
            }
            return tokens;
        }
    }
    
}