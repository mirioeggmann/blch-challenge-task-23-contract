import { ethers } from "hardhat";

async function main() {
  const exchangeAddress = "0x3288b0e0194b2b74571a62a344c67b7d62637f7b";

  const etherTickets = await ethers.deployContract("EtherTickets", [2, "HardHatTickets","HHT",exchangeAddress]);

  await etherTickets.waitForDeployment();

  console.log(`EtherTickets deployed to: ${etherTickets.target}`);  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
