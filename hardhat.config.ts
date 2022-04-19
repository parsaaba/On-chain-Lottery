import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import { config } from "dotenv";

config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export const defaultNetwork = "kovan";

export const networks = {
  hardhat: { accounts: { mnemonic: process.env.MNEMONIC } },
  kovan: {
    url: "https://eth-kovan.alchemyapi.io/v2/X54iNOtaSQ76R-dHu84BgWWFUbUQV3SN",
    accounts: { mnemonic: process.env.MNEMONIC },
  },
  matic_testnet: {
    url: "https://rpc-mumbai.maticvigil.com",
    accounts: { mnemonic: process.env.MNEMONIC },
  },
};

export const solidity = {
  version: "0.8.6",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};

export const paths = {
  sources: "./contracts",
  tests: "./test",
  cache: "./cache",
  artifacts: "./artifacts",
};

export const mocha = {
  timeout: 20000,
};
