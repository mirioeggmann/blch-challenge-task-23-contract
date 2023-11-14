import { ethers } from "hardhat";

async function main() {
  const owners = ["0xbcD774708B59EF40383fF9996bf049b58E881eEF", "0xD4d0ca254677644d8f40F004200B2416650935b9", "0x79AC71B08C28A868CC8197d76B45701885E29c53"]

  const eventTicket = await ethers.deployContract("EventTicket", [ owners ]);

  await eventTicket.waitForDeployment();

  console.log(`EventTicket deployed to: ${eventTicket.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
