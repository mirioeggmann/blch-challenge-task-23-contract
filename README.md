# blch-challenge-task-23-contract

## Development tooling
- Open this Hardhat project (optimally in VS Code with [VS Code extension](https://hardhat.org/hardhat-vscode/docs/overview)) and run `npm install`
- Use Remix either on `https://remix.ethereum.org/` or run it locally with [docker-compose](https://github.com/ethereum/remix-project/blob/master/docker-compose.yaml)
- Run remixd daemon in the contract project dir to be able to work with data from localhost in Remix `npx @remix-project/remixd`

### Hardhat commands
```shell
npx hardhat test

npx hardhat node

npx hardhat run scripts/deploy.ts # default hardhat network
npx hardhat run scripts/deploy.ts --network sepolia
```
