// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import * as hre from "hardhat";
import chalk from "chalk";

const entryFee = process.env.ENTRYFEE || 1000; // defaut 1000 wei
const ownerFee = process.env.OWNERFEE || 500; // default 500 wei

if (entryFee < ownerFee) {
  throw new Error("Entry Fee must be greater than Owner Fee!");
}

/**
 * RandomNumberGenerator
 * Network: Kovan Ethereum Testnet
 * Chainlink VRF Coordinator Address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
 * LINK Token Address               : 0xa36085F69e2889c224210F603D836748e7dC0088
 * Key Hash                         : 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
 */

// set chainlink vrf coordinator address
const vrfCoordinator = "0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9";
// set link token address
const linkToken = "0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9";
// set ropsten key hash
const keyHash = "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4";
// set ropsten LINK fee
const feeInLink = hre.ethers.utils.parseEther("0.1"); // 0.1 LINK (varies by network)

const main = async () => {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // start time
  const startTime = Date.now();
  console.log(`\n${chalk.white.bold(`Starting deployment on`)} ${chalk.green(new Date())}\n`);

  const RandomNumberGenerator = await hre.ethers.getContractFactory("RandomNumberGenerator");
  const randomNumberGenerator = await RandomNumberGenerator.deploy(vrfCoordinator, linkToken, keyHash, feeInLink);
  await randomNumberGenerator.deployed();
  const randomNumberGeneratorDeployTime = Date.now();
  console.log(
    `${chalk.blueBright(`RandomNumberGenerator`)}   ━━━━━━▶  ${chalk.blueBright(
      randomNumberGenerator?.address,
    )}\t ${chalk.greenBright(Math.floor((randomNumberGeneratorDeployTime - startTime) / 1000))} seconds`,
  );

  /**
   * deploy Lottery contract
   */

  console.log(`\nDeploying ${chalk.yellowBright.bold(`Lottery`)}
Player entry fee         : ${chalk.magenta(entryFee)}
Owner fee                : ${chalk.magenta(ownerFee)}
Random Number Generator  : ${chalk.magenta(randomNumberGenerator.address)}
  `);

  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy(entryFee, ownerFee, randomNumberGenerator.address);
  await lottery.deployed();
  const lotteryDeployTime = Date.now();
  console.log(
    `${chalk.yellowBright.bold(`Lottery`)}   ━━━━━━▶  ${chalk.yellow.bold(lottery?.address)}\t ${chalk.greenBright(
      Math.floor((lotteryDeployTime - randomNumberGeneratorDeployTime) / 1000),
    )} seconds`,
  );

  console.log(
    `\n${chalk.bold(`Total Time:`)} ${chalk.greenBright.bold(Math.floor((Date.now() - startTime) / 1000))} seconds`,
  );
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
