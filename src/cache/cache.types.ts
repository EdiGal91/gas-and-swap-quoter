export interface CacheClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}

export type Entry = { value: string; expiresAt?: number };
