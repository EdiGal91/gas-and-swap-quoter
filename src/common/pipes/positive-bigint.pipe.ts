import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveBigIntPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const input = value?.trim();

    if (!input) {
      throw new BadRequestException('Amount is required');
    }

    // digits only
    if (!/^\d+$/.test(input)) {
      throw new BadRequestException('Amount must be a positive number');
    }

    try {
      const bigIntValue = BigInt(input);
      if (bigIntValue <= 0n) {
        throw new BadRequestException('Amount must be > 0');
      }
    } catch (error) {
      throw new BadRequestException('Invalid numeric value');
    }

    return input;
  }
}
