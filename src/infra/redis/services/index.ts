import { ICacheService } from '@src/domain/interfaces';
import { redisConnection } from '../config';
import { HasAndDelResponse } from '../types';

export class RedisService implements ICacheService {
  constructor(private readonly cache = redisConnection) {}

  private toSet<T>(payload: T): string {
    const isString = typeof payload === 'string';

    if (isString) return payload;

    return JSON.stringify(payload);
  }

  private toGet<T>(payload: string): T {
    return JSON.parse(payload);
  }

  public del(...keys: string[]): Promise<HasAndDelResponse> {
    return this.cache.del(keys) as Promise<HasAndDelResponse>;
  }

  public set<T>(key: string, payload: T): Promise<'OK' | null> {
    return this.cache.set(key, this.toSet(payload));
  }

  public async get<T>(key: string): Promise<T | null> {
    const cache = await this.cache.get(key);

    if (!cache) return null;

    return this.toGet<T>(cache);
  }

  public has(key: string): Promise<HasAndDelResponse> {
    return this.cache.exists(key) as Promise<HasAndDelResponse>;
  }

  public async update<T>(key: string, payload: T): Promise<'OK' | null> {
    await this.del(key);

    return this.set(key, payload);
  }
}
