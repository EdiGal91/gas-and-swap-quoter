import { Controller, Get, Param } from '@nestjs/common';
import { SwapService } from './swap.service';

@Controller()
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Get('/return/:fromTokenAddress/:toTokenAddress/:amountIn')
  async swap(
    @Param('fromTokenAddress') fromTokenAddress: string,
    @Param('toTokenAddress') toTokenAddress: string,
    @Param('amountIn') amountIn: string,
  ) {
    const result = await this.swapService.getSwapResult(
      fromTokenAddress,
      toTokenAddress,
      amountIn,
    );
    return result;
  }
}
