import {
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { NFTExchange } from "../typechain-types";

describe("NFTExchange", function () {
    async function deployNFTExchange() {
        const NFTExchange = await ethers.getContractFactory("NFTExchange");
        const nftExchange : NFTExchange = await NFTExchange.deploy();

        const [nftOwner] = await ethers.getSigners();
        const EtherTickets = await ethers.getContractFactory("EtherTickets");
        const etherTickets  = await EtherTickets.deploy(
            2,
            "EtherTickets",
            "ETT",
            await nftExchange.getAddress()
        );
        
        return {nftExchange, etherTickets, nftOwner};
    }

  describe("Deployment", function () {
    it("Should deploy the contract with the correct owner", async function () {
      const { nftExchange } = await loadFixture(deployNFTExchange);
      const exchangeOwner = await nftExchange.owner();
      const address = await nftExchange.getAddress();
      expect(exchangeOwner).to.equal(address);
    });

    it("Initial listing count should be zero", async function () {
      const { nftExchange } = await loadFixture(deployNFTExchange);
      expect(await nftExchange._listingIds()).to.equal(0);
    });
  });

  describe("createListing", function () {
    it("Should create a listing and emit an event", async function () {
      const { nftExchange, etherTickets, nftOwner } = await loadFixture(deployNFTExchange);

      const tokenId = 0;
      const listingPrice = 1337;
      const etherTicketsAddress = await etherTickets.getAddress();
      const nftOwnerAddress = await nftOwner.getAddress();

      await expect(
        await nftExchange.connect(nftOwner).createListing(etherTicketsAddress, tokenId, listingPrice)
      ).to.emit(nftExchange, "ListingCreated").withArgs(1, etherTicketsAddress, tokenId, nftOwnerAddress, listingPrice);

      const listing = await nftExchange.listings(1);
      expect(listing.id).to.equal(1);
      expect(listing.nftContract).to.equal(etherTicketsAddress);
      expect(listing.tokenId).to.equal(tokenId);
      expect(listing.price).to.equal(listingPrice);
      expect(listing.isSold).to.be.false;
    });
  });

  describe("createMultipleListing", function () {
    it("Should create multiple listings", async function () {
      const { nftExchange, etherTickets, nftOwner } = await loadFixture(deployNFTExchange);

      const tokenIdFrom = 0;
      const tokenIdTo = 1;
      const listingPrice = 1337;

      const etherTicketsAddress = await etherTickets.getAddress();

      await nftExchange.connect(nftOwner).createMultipleListing(
        etherTicketsAddress, 
        listingPrice, 
        tokenIdFrom, 
        tokenIdTo
        );

      const listing = await nftExchange.listings(1);
      expect(listing.id).to.equal(1);
      expect(listing.nftContract).to.equal(etherTicketsAddress);
      expect(listing.tokenId).to.equal(tokenIdFrom);
      expect(listing.price).to.equal(listingPrice);
      expect(listing.isSold).to.be.false;

      const listing2 = await nftExchange.listings(2);
      expect(listing2.id).to.equal(2);
      expect(listing2.nftContract).to.equal(etherTicketsAddress);
      expect(listing2.tokenId).to.equal(tokenIdTo);
      expect(listing2.price).to.equal(listingPrice);
      expect(listing2.isSold).to.be.false;
    });
  });

  describe("buyNFT", function () {
    it("Should allow a user to buy an NFT if the price is met", async function () {
      const { nftExchange, etherTickets, nftOwner } = await loadFixture(deployNFTExchange);

      const tokenId = 0;
      const listingPrice = 1337;
      const etherTicketsAddress = await etherTickets.getAddress();

      await nftExchange.connect(nftOwner).createListing(etherTicketsAddress, tokenId, listingPrice);

      const [buyer] = await ethers.getSigners();
      const buyerAddress = await buyer.getAddress();
      const listingId = 1;

      await expect(
        await nftExchange.connect(buyer).buyNFT(listingId, {value: listingPrice})
      ).to.emit(nftExchange, "ListingSold").withArgs(listingId, buyerAddress);

      const listing = await nftExchange.listings(listingId);
      expect(listing.isSold).to.be.true;
    });
  });

  describe("getAllListings", function () {
    it("Should retrieve all listings correctly", async function () {
      const { nftExchange, etherTickets, nftOwner } = await loadFixture(deployNFTExchange);

      const tokenId = 0;
      const listingPrice = 1337;
      const etherTicketsAddress = await etherTickets.getAddress();

      await nftExchange.connect(nftOwner).createListing(etherTicketsAddress, tokenId, listingPrice);

      const tokenId2 = 1;
      const listingPrice2 = 1338;

      await nftExchange.connect(nftOwner).createListing(etherTicketsAddress, tokenId2, listingPrice2);

      const listings = await nftExchange.getAllListings();

      expect(listings.length).to.equal(2);
      expect(listings[0].id).to.equal(1);
      expect(listings[0].nftContract).to.equal(etherTicketsAddress);
      expect(listings[0].tokenId).to.equal(tokenId);
      expect(listings[0].price).to.equal(listingPrice);
      expect(listings[0].isSold).to.be.false;
      expect(listings[1].id).to.equal(2);
      expect(listings[1].nftContract).to.equal(etherTicketsAddress);
      expect(listings[1].tokenId).to.equal(tokenId2);
      expect(listings[1].price).to.equal(listingPrice2);
      expect(listings[1].isSold).to.be.false;
    });
  });
});