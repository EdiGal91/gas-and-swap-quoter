import { Module } from '@nestjs/common';
import { SwapController } from './swap.controller';
import { SwapService } from './swap.service';
import { UniswapService } from './uniswap.service';

@Module({
  controllers: [SwapController],
  providers: [SwapService, UniswapService],
})
export class SwapModule {}
