import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { EthAddressPipe } from '../common/pipes/eth-address.pipe';
import { SwapService } from './swap.service';

@Controller()
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Get('/return/:fromTokenAddress/:toTokenAddress/:amountIn')
  async swap(
    @Param('fromTokenAddress', EthAddressPipe) fromTokenAddress: string,
    @Param('toTokenAddress', EthAddressPipe) toTokenAddress: string,
    @Param('amountIn') amountIn: string,
  ) {
    try {
      const result = await this.swapService.getSwapResult(
        fromTokenAddress,
        toTokenAddress,
        amountIn,
      );
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
