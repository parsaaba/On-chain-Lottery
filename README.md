# Lottery

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D10.0-blue.svg)

### On-chain Lottery smart contract with Random Number VRF Consumer using ChainLink VRF

[Documentation](https://ipfs.io/ipfs/QmPJTrZzyPFt3HhMg8umtPGyq4PY3dvz96zUo8RUJ6YbbP)

## Setup
- `yarn`
- `yarn global add hardhat-shorthand`

## Run local node
- `yarn node`

## Environment File (.env)
- Configure the following environment variables on a .env in the package root:
  - Mnemonic - Deployment Owner(s) BIP-32 Mnemonic phrase
  - Lottery Participant Entry Fee in Wei
  - Owner Fee in Wei

## Compile & migrate (Deploy) Contracts
- `yarn deploy` (Default network: Kovan Ethereum Testnet)


![image](https://user-images.githubusercontent.com/25655858/120903480-e842d000-c678-11eb-8731-56906fad5b8f.png)

## Run Tests
- `yarn test`

## Parsa Ba