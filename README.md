# blch-challenge-task-23-contract

## Development tooling
- Open this Hardhat project (optimally in VS Code with [VS Code extension](https://hardhat.org/hardhat-vscode/docs/overview)) and run `npm install`
- Use Remix either on `https://remix.ethereum.org/` or run it locally with [docker-compose](https://github.com/ethereum/remix-project/blob/master/docker-compose.yaml)
- Run remixd daemon in the contract project dir to be able to work with data from localhost in Remix `npx @remix-project/remixd`
- Create a `.env` file on basis of the `.env.template` to be able to deploy to the Sepolia network

### Hardhat commands
```shell
npx hardhat test

npx hardhat run scripts/deployEtherTickets.ts # default is hardhat network
npx hardhat run scripts/deployNFTExchange.ts
npx hardhat run scripts/deployNFTExchange.ts --network sepolia
```
