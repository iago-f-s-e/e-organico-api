import { Injectable } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { IFindProducerMarketUseCase } from '@src/domain/interfaces';
import { ProducerMarketRepository } from '@src/infra/database/repositories';
import { RedisService } from '@src/infra/redis/services';

@Injectable()
export class FindProducerMarketUseCase implements IFindProducerMarketUseCase {
  private cacheKey = keys.PRODUCER_MARKET_ONLY_MARKET_ID;

  constructor(
    private readonly repository: ProducerMarketRepository,
    private readonly cache: RedisService
  ) {}

  private getCache<T>(key: string): Promise<T | null> {
    return this.cache.get<T>(key);
  }

  private async setCache<T>(payload: T, key: string): Promise<void> {
    await this.cache.set(key, payload);
  }

  public async onlyMarketIdByProducerId(id: string): Promise<string[]> {
    const key = `${this.cacheKey}${id}`;

    const cache = await this.getCache<string[]>(key);

    if (cache) return cache;

    const ids = await this.repository.findOnlyProductIdsByProducerId(id);

    this.setCache(ids, key);

    return ids;
  }
}
