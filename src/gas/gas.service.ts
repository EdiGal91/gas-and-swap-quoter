import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FeeData, JsonRpcProvider, formatUnits } from 'ethers';
import { GasPriceResponseDto } from './dto/gas-price.dto';
import { CacheManager } from 'src/cache/cache.manager';

@Injectable()
export class GasService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(GasService.name);
  private readonly provider: JsonRpcProvider;
  private readonly cacheKey = 'gas:feeData:v1';
  private readonly gasUnit = 'gwei';
  private readonly cacheRefreshInterval: number;
  private interval: NodeJS.Timeout;

  constructor(
    private readonly configService: ConfigService,
    private readonly cache: CacheManager,
  ) {
    const rpcUrl = this.configService.getOrThrow<string>('RPC_URL');
    this.provider = new JsonRpcProvider(rpcUrl);
    this.cacheRefreshInterval = parseInt(
      this.configService.get<string>('CACHE_REFRESH_INTERVAL_MS', '3000'),
    );
  }

  async onModuleInit() {
    await this.refreshGasPriceCache();
    this.interval = setInterval(async () => {
      await this.refreshGasPriceCache();
    }, this.cacheRefreshInterval);
  }

  onModuleDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  async getGasPrice(): Promise<GasPriceResponseDto> {
    try {
      const cached = await this.cache.get(this.cacheKey);
      if (cached) {
        return JSON.parse(cached) as GasPriceResponseDto;
      }
      //   fallback, cache should always be exists
      const feeData = await this.fetchGasPrice();
      return feeData;
    } catch (error) {
      this.logger.error(`Failed to get gas price: ${error.message}`);
      throw new Error('Failed to get gas price');
    }
  }

  private async fetchGasPrice(): Promise<GasPriceResponseDto> {
    try {
      const feeData: FeeData = await this.provider.getFeeData();

      const result = {
        gasPrice: formatUnits(feeData.gasPrice ?? BigInt(0), this.gasUnit),
        maxFeePerGas: formatUnits(
          feeData.maxFeePerGas ?? BigInt(0),
          this.gasUnit,
        ),
        maxPriorityFeePerGas: formatUnits(
          feeData.maxPriorityFeePerGas ?? BigInt(0),
          this.gasUnit,
        ),
        unit: this.gasUnit,
      };

      return result;
    } catch (error) {
      this.logger.error(`Failed to fetch gas price: ${error.message}`);
      throw new Error('Failed to fetch gas price');
    }
  }

  private async refreshGasPriceCache() {
    try {
      const feeData = await this.fetchGasPrice();
      await this.cache.set(this.cacheKey, JSON.stringify(feeData));
    } catch (error) {
      this.logger.error(`Failed to refresh gas price: ${error.message}`);
    }
  }
}
