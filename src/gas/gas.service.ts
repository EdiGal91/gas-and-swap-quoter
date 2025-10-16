import { Injectable } from '@nestjs/common';

@Injectable()
export class GasService {
  async getGasPrice() {
    return 1;
  }
}
