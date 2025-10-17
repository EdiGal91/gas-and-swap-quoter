import { BadRequestException, Injectable } from '@nestjs/common';
import { UniswapService } from './uniswap.service';

@Injectable()
export class SwapService {
  constructor(private readonly uniswapService: UniswapService) {}

  async getSwapResult(
    fromTokenAddress: string,
    toTokenAddress: string,
    amountIn: string,
  ) {
    const pairAddress = await this.uniswapService.getPairAddress(
      fromTokenAddress,
      toTokenAddress,
    );
    const { token0, token1, reserve0, reserve1 } =
      await this.uniswapService.getPairInfo(pairAddress);

    if (reserve0 === 0n || reserve1 === 0n) {
      throw new BadRequestException('Pool has zero liquidity');
    }

    return {
      fromTokenAddress,
      toTokenAddress,
      amountIn,
      pairAddress,
      token0,
      token1,
      reserve0: reserve0.toString(),
      reserve1: reserve1.toString(),
    };
  }
}
