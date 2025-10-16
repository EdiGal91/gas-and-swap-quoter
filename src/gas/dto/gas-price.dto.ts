import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GasPriceResponseDto {
  @ApiProperty()
  @IsString()
  gasPrice: string;

  @ApiProperty()
  @IsString()
  maxFeePerGas: string;

  @ApiProperty()
  @IsString()
  maxPriorityFeePerGas: string;

  @ApiProperty({ example: 'gwei' })
  @IsString()
  unit: string;
}
