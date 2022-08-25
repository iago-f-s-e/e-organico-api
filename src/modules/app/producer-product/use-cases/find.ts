import { Injectable } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { IFindProducerProductUseCase } from '@src/domain/interfaces';
import { ProducerProduct } from '@src/infra/database/entities';
import { ProducerProductRepository } from '@src/infra/database/repositories';
import { RedisService } from '@src/infra/redis/services';
import { right } from '@src/shared/either';
import { FindResponse } from '@src/types/responses';

@Injectable()
export class FindProducerProductUseCase implements IFindProducerProductUseCase {
  private cacheKey = keys.PRODUCER_PRODUCT_ONLY_PRODUCT_ID;

  constructor(
    private readonly repository: ProducerProductRepository,
    private readonly cache: RedisService
  ) {}

  private getCache<T>(key: string): Promise<T | null> {
    return this.cache.get<T>(key);
  }

  private async setCache<T>(payload: T, key: string): Promise<void> {
    await this.cache.set(key, payload);
  }

  public async byId(id: string): FindResponse<ProducerProduct> {
    return right(await this.repository.findByIdOrError(id));
  }

  public byProducerId(id: string): Promise<ProducerProduct[]> {
    return this.repository.findByProducerId(id);
  }

  public async onlyProductIdByProducerId(id: string): Promise<string[]> {
    const key = `${this.cacheKey}${id}`;

    const cache = await this.getCache<string[]>(key);

    if (cache) return cache;

    const ids = await this.repository.findOnlyProductIdsByProducerId(id);

    this.setCache(ids, key);

    return ids;
  }
}
