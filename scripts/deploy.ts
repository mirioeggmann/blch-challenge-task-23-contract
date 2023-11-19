import { ethers } from "hardhat";

async function main() {
  const etherTickets = await ethers.deployContract("EtherTickets");

  await etherTickets.waitForDeployment();

  console.log(`EtherTickets deployed to: ${etherTickets.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
