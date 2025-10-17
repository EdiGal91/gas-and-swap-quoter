import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GasModule } from './gas/gas.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CacheModule, GasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
