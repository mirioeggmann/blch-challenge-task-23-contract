import { ethers } from "hardhat";
import {
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";

describe("EtherTickets", function () {
    async function deployEtherTickets() {
        const [owner, exchange] = await ethers.getSigners();

        const EtherTickets = await ethers.getContractFactory("EtherTickets");
        const maxSupply = 10;
        const etherTickets = await EtherTickets.deploy(maxSupply, "EtherTickets Event", "ETT", exchange.address);

        return { etherTickets, owner, exchange, maxSupply };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { etherTickets, owner } = await loadFixture(deployEtherTickets);
            expect(await etherTickets.owner()).to.equal(owner.address);
        });

        it("Should mint initial supply to the owner", async function () {
            const { etherTickets, owner, maxSupply } = await loadFixture(deployEtherTickets);
            const ownerBalance = await etherTickets.balanceOf(owner.address);
            expect(ownerBalance).to.equal(maxSupply);
        });
    });

    describe("Token Usage", function () {
        it("Should allow token burning", async function () {
            const { etherTickets, owner } = await loadFixture(deployEtherTickets);
            await expect(etherTickets.connect(owner).useToken(0)).to.emit(etherTickets, "tokenWasUsed").withArgs(owner.address, 0);
        });

        it("Should update the token usage status", async function () {
            const { etherTickets, owner } = await loadFixture(deployEtherTickets);
            await etherTickets.connect(owner).useToken(0);
            expect(await etherTickets.tokenIsUsed(0)).to.be.true;
        });
    });

    describe("Token Enumeration", function () {
        it("Should list all owned tokens", async function () {
            const { etherTickets, owner } = await loadFixture(deployEtherTickets);
            const ownedTokens = [];
            const ownerBalance = await etherTickets.balanceOf(owner.address);
            for (let i = 0; i < ownerBalance; i++) {
                const tokenId = await etherTickets.tokenOfOwnerByIndex(owner.address, i);
                ownedTokens.push(tokenId);
            }
            expect(ownedTokens).to.have.lengthOf(ownerBalance);
        });
    });
});