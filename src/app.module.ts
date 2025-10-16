import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GasModule } from './gas/gas.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
