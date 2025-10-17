import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheClient } from './cache.types';
import { MemoryCacheClient } from './memory.client';

@Injectable()
export class CacheManager {
  private readonly client: CacheClient;

  constructor(private readonly configService: ConfigService) {
    this.client = new MemoryCacheClient();
  }

  get(key: string) {
    return this.client.get(key);
  }

  set(key: string, value: string, ttlSeconds?: number) {
    return this.client.set(key, value, ttlSeconds);
  }
}
