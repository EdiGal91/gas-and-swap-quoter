import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FeeData, JsonRpcProvider, formatUnits } from 'ethers';
import { GasPriceResponseDto } from './dto/gas-price.dto';
import { CacheManager } from 'src/cache/cache.manager';

@Injectable()
export class GasService {
  private readonly logger = new Logger(GasService.name);
  private readonly provider: JsonRpcProvider;
  private readonly cacheKey = 'gas:feeData:v1';

  constructor(
    private readonly configService: ConfigService,
    private readonly cache: CacheManager,
  ) {
    const rpcUrl = this.configService.getOrThrow<string>('RPC_URL');
    this.provider = new JsonRpcProvider(rpcUrl);
  }

  async getGasPrice(): Promise<GasPriceResponseDto> {
    try {
      const cached = await this.cache.get(this.cacheKey);
      if (cached) {
        return JSON.parse(cached) as GasPriceResponseDto;
      }

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

      await this.cache.set(this.cacheKey, JSON.stringify(result), 10);

      return result;
    } catch (error) {
      this.logger.error('Failed to get gas price:', error.message);
      throw new Error('Failed to get gas price');
    }
  }
}
