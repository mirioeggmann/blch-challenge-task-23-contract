import 'dotenv/config';
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const INFURA_API_KEY = process.env.INFURA_API_KEY || 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

const config: HardhatUserConfig = {
  solidity: "0.8.23",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  sourcify: {
    enabled: true,
  },
  etherscan: {
    apiKey: {
      sepolia: `${ETHERSCAN_API_KEY}`
    }
  },
};

export default config;
