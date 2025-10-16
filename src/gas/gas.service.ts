import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FeeData, JsonRpcProvider, formatUnits } from 'ethers';
import { GasPriceResponseDto } from './dto/gas-price.dto';

@Injectable()
export class GasService {
  private readonly logger = new Logger(GasService.name);
  private readonly provider: JsonRpcProvider;

  constructor(private readonly configService: ConfigService) {
    const rpcUrl = this.configService.getOrThrow<string>('RPC_URL');
    this.provider = new JsonRpcProvider(rpcUrl);
  }

  async getGasPrice(): Promise<GasPriceResponseDto> {
    try {
      const feeData: FeeData = await this.provider.getFeeData();
      const unit = 'gwei';

      const result = {
        gasPrice: formatUnits(feeData.gasPrice ?? BigInt(0), unit),
        maxFeePerGas: formatUnits(feeData.maxFeePerGas ?? BigInt(0), unit),
        maxPriorityFeePerGas: formatUnits(
          feeData.maxPriorityFeePerGas ?? BigInt(0),
          unit,
        ),
        unit,
      };

      return result;
    } catch (error) {
      this.logger.error('Failed to get gas price:', error.message);
      throw new Error('Failed to get gas price');
    }
  }
}
