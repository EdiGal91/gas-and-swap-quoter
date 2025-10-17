import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { getAddress, isAddress } from 'ethers';

@Injectable()
export class EthAddressPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const input = value?.trim();
    if (!input || !isAddress(input)) {
      throw new BadRequestException('Invalid Ethereum address');
    }
    return getAddress(input);
  }
}
