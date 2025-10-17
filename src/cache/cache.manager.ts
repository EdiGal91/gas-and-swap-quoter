import { Injectable } from '@nestjs/common';
import { CacheClient } from './cache.types';
import { MemoryCacheClient } from './memory.client';

@Injectable()
export class CacheManager {
  private readonly client: CacheClient;

  constructor() {
    this.client = new MemoryCacheClient();
  }

  get(key: string) {
    return this.client.get(key);
  }

  set(key: string, value: string) {
    return this.client.set(key, value);
  }
}
