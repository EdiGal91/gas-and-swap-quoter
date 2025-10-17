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
    const { token0, reserve0, token1, reserve1 } =
      await this.uniswapService.getPairInfo(pairAddress);

    if (reserve0 === 0n || reserve1 === 0n) {
      throw new BadRequestException('Pool has zero liquidity');
    }

    let reserveIn: bigint;
    let reserveOut: bigint;

    if (
      fromTokenAddress.toLowerCase() === token0.toLowerCase() &&
      toTokenAddress.toLowerCase() === token1.toLowerCase()
    ) {
      reserveIn = reserve0;
      reserveOut = reserve1;
    } else if (
      fromTokenAddress.toLowerCase() === token1.toLowerCase() &&
      toTokenAddress.toLowerCase() === token0.toLowerCase()
    ) {
      reserveIn = reserve1;
      reserveOut = reserve0;
    } else {
      throw new BadRequestException('Invalid token pair');
    }

    /**
     *
     * reserveIn * reserveOut = K (constant)
     * (reserveIn + amountIn) * (reserveOut - amountOut) = K
     *
     * (reserveIn + amountIn) * (reserveOut - amountOut) = reserveIn * reserveOut
     * reserveIn * reserveOut - reserveIn * amountOut + amountIn * reserveOut - amountIn * amountOut = reserveIn * reserveOut
     * - reserveIn * amountOut + amountIn * reserveOut - amountIn * amountOut = 0
     * amountIn * reserveOut = reserveIn * amountOut + amountIn * amountOut
     * amountIn * reserveOut = amountOut(reserveIn + amountIn)
     * amountOut = (amountIn * reserveOut) / (reserveIn + amountIn)
     */

    const amountOut =
      (BigInt(amountIn) * reserveOut) / (reserveIn + BigInt(amountIn));

    return {
      fromTokenAddress,
      toTokenAddress,
      amountIn,
      pairAddress,
      token0,
      token1,
      reserve0: reserve0.toString(),
      reserve1: reserve1.toString(),
      amountOut: amountOut.toString(),
    };
  }
}
