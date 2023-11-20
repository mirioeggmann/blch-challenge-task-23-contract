import { ethers } from "hardhat";

async function main() {
  const etherTickets = await ethers.deployContract("EtherTickets", ["0xbcD774708B59EF40383fF9996bf049b58E881eEF"]);

  await etherTickets.waitForDeployment();

  console.log(`EtherTickets deployed to: ${etherTickets.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
