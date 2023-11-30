// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
 
contract EtherTickets is ERC721, ERC721Burnable, ERC721Enumerable, Ownable {
    
    uint256 private _maxSupply;
    mapping(uint256 => bool) public tokenIsUsed;

    event tokenWasUsed(address indexed from, uint256 tokenId);

    constructor(uint256 maxSupply, string memory eventName, string memory eventShortName, address exchange)
        ERC721(eventName, eventShortName)
        Ownable(msg.sender)
    {
       _maxSupply = maxSupply;
       mint(maxSupply);
       setApprovalForAll(exchange, true);
    }

    function mint(uint256 numberOfTokens) public onlyOwner {
        require(totalSupply() < _maxSupply);
        for (uint256 i = 0; i < numberOfTokens; i++) {
            _safeMint(msg.sender, totalSupply());
            tokenIsUsed[totalSupply()] = false;
        }
    }
   
    function useToken(uint256 tokenId) public returns (bool)
    {
        burn(tokenId);
        tokenIsUsed[tokenId] = true;
        emit tokenWasUsed(msg.sender, tokenId);
        return true;
    }


    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

       function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}