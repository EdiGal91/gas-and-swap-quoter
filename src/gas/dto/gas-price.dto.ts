import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString } from 'class-validator';

export class GasPriceResponseDto {
  @ApiProperty()
  @IsNumberString()
  gasPrice: string;

  @ApiProperty()
  @IsNumberString()
  maxFeePerGas: string;

  @ApiProperty()
  @IsNumberString()
  maxPriorityFeePerGas: string;

  @ApiProperty({ example: 'gwei' })
  @IsEnum(['gwei'])
  unit: string;
}
