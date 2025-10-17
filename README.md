## gas-and-swap-quoter

NestJS service with two endpoints.

### Endpoints

- GET `/api/v1/gasPrice`: current gas price
- GET `/api/v1/return/:fromTokenAddress/:toTokenAddress/:amountIn`: quote how many `toTokenAddress` tokens you get for swapping `amountIn` of `fromTokenAddress`

### Swagger

- Available at `/api/docs` after the server starts

### Run

1. Clone the repo
2. Copy env: `cp .env.example .env` and set `RPC_URL` with your Infura API key
3. Install deps: `npm ci`
4. Start dev: `npm run start:dev`

### Curl examples

Get gas price:

```bash
curl --location 'http://localhost:3000/api/v1/gasPrice'
```

Quote USDC for swapping 1 WETH on Uniswap v2:

```bash
curl --location 'http://localhost:3000/api/v1/return/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/1000000000000000000'
```
