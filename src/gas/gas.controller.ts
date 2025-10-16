import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { GasPrice, GasService } from './gas.service';

@Controller()
export class GasController {
  constructor(private readonly gasService: GasService) {}

  @Get('gasPrice')
  async getGas(): Promise<GasPrice> {
    try {
      const gasPrice = await this.gasService.getGasPrice();
      return gasPrice;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
