// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTExchange is Ownable {
    uint256 public _listingIds;

    struct Listing {
        uint256 id;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        uint256 price;
        bool isSold;
    }

    mapping(uint256 => Listing) public listings;

    constructor()
        Ownable(address(this))
    {}

    event ListingCreated(uint256 indexed id, address indexed nftContract, uint256 indexed tokenId, address seller, uint256 price);
    event ListingSold(uint256 indexed id, address indexed buyer);

    function createListing(address nftContract, uint256 tokenId, uint256 price) public {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        _listingIds += 1;

        listings[_listingIds] = Listing({
            id: _listingIds,
            nftContract: nftContract,
            tokenId: tokenId,
            seller: payable(msg.sender),
            price: price,
            isSold: false
        });

        emit ListingCreated(_listingIds, nftContract, tokenId, msg.sender, price);
    }

    function buyNFT(uint256 listingId) public payable {
        Listing storage listing = listings[listingId];
        require(!listing.isSold, "NFT is already sold");
        require(msg.value >= listing.price, "Insufficient funds");

        listing.seller.transfer(listing.price);
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        listing.isSold = true;

        emit ListingSold(listingId, msg.sender);
    }

     function getAllListings() public view returns (Listing[] memory) {
        Listing[] memory allListings = new Listing[](_listingIds);

        for (uint256 i = 0; i < _listingIds; i++) {
            allListings[i] = listings[i + 1];
        }
        return allListings;
    }
}