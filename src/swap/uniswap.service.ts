import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Contract, JsonRpcProvider } from 'ethers';
import {
  PAIR_ABI,
  UNISWAP_V2_FACTORY_ABI,
  UNISWAP_V2_FACTORY_ADDRESS,
} from './uniswap.constants';

@Injectable()
export class UniswapService {
  private readonly provider: JsonRpcProvider;

  constructor(private readonly configService: ConfigService) {
    const rpcUrl = this.configService.getOrThrow<string>('RPC_URL');
    this.provider = new JsonRpcProvider(rpcUrl);
  }

  async getPairAddress(fromTokenAddress: string, toTokenAddress: string) {
    const factoryContract = new Contract(
      UNISWAP_V2_FACTORY_ADDRESS,
      UNISWAP_V2_FACTORY_ABI,
      this.provider,
    );

    const pairAddress: string = await factoryContract.getPair(
      fromTokenAddress,
      toTokenAddress,
    );

    return pairAddress;
  }

  async getPairInfo(pairAddress: string) {
    const pairContract = new Contract(pairAddress, PAIR_ABI, this.provider);
    const token0 = await pairContract.token0();
    const token1 = await pairContract.token1();
    const reserves = await pairContract.getReserves();

    return {
      token0,
      reserve0: reserves.reserve0,
      token1,
      reserve1: reserves.reserve1,
    };
  }
}
