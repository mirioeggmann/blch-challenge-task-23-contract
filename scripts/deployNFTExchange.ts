import { ethers } from "hardhat";

async function main() {
  const nftExchange = await ethers.deployContract("NFTExchange");

  await nftExchange.waitForDeployment();

  console.log(`NFTExchange deployed to: ${nftExchange.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
