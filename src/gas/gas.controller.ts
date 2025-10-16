import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiExpectationFailedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { GasService } from './gas.service';
import { GasPrice } from './gas.types';
import { GasPriceResponseDto } from './dto/gas-price.dto';

@Controller()
export class GasController {
  constructor(private readonly gasService: GasService) {}

  @Get('gasPrice')
  @ApiOperation({ summary: 'Get gas price' })
  @ApiOkResponse({
    description: 'Gas price',
    type: GasPriceResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: HttpException,
  })
  async getGas(): Promise<GasPrice> {
    try {
      const gasPrice = await this.gasService.getGasPrice();
      return gasPrice;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
