import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNumberString, IsString } from 'class-validator';

export class SwapResultResponseDto {
  @ApiProperty()
  @IsString()
  @IsEthereumAddress()
  fromTokenAddress: string;

  @ApiProperty()
  @IsString()
  @IsEthereumAddress()
  toTokenAddress: string;

  @ApiProperty()
  @IsNumberString()
  amountIn: string;

  @ApiProperty()
  @IsString()
  @IsEthereumAddress()
  pairAddress: string;

  @ApiProperty()
  @IsString()
  @IsEthereumAddress()
  token0: string;

  @ApiProperty()
  @IsString()
  @IsEthereumAddress()
  token1: string;

  @ApiProperty()
  @IsNumberString()
  reserve0: string;

  @ApiProperty()
  @IsNumberString()
  reserve1: string;

  @ApiProperty()
  @IsNumberString()
  amountOut: string;
}
