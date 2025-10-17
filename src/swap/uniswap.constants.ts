export const UNISWAP_V2_FACTORY_ADDRESS =
  '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

// https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Factory.sol
export const UNISWAP_V2_FACTORY_ABI = [
  'function getPair(address, address) external view returns (address pair)',
];

// https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Pair.sol
export const PAIR_ABI = [
  'function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function token0() view returns (address)',
  'function token1() view returns (address)',
];
