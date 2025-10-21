import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { EthAddressPipe } from '../common/pipes/eth-address.pipe';
import { PositiveBigIntPipe } from '../common/pipes/positive-bigint.pipe';
import { SwapService } from './swap.service';
import { SwapResultResponseDto } from './dto/swap-result-response.dto';

@Controller()
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @ApiOperation({ summary: 'Get swap result' })
  @ApiOkResponse({
    description: 'Swap result',
    type: SwapResultResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: HttpException,
  })
  @Get('/return/:fromTokenAddress/:toTokenAddress/:amountIn')
  async swap(
    @Param('fromTokenAddress', EthAddressPipe) fromTokenAddress: string,
    @Param('toTokenAddress', EthAddressPipe) toTokenAddress: string,
    @Param('amountIn', PositiveBigIntPipe) amountIn: string,
  ): Promise<SwapResultResponseDto> {
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
