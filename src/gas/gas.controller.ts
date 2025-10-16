import { Controller, Get } from '@nestjs/common';
import { GasService } from './gas.service';

@Controller('gas')
export class GasController {
  constructor(private readonly gasService: GasService) {}

  @Get()
  async getGas() {
    const gasPrice = await this.gasService.getGasPrice();
    return { gasPrice };
  }
}
