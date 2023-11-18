import { ethers } from "hardhat";

async function main() {
  const eventTicket = await ethers.deployContract("EventTicket");

  await eventTicket.waitForDeployment();

  console.log(`EventTicket deployed to: ${eventTicket.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
