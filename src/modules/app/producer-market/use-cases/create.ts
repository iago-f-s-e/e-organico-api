import { Injectable } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { CreateProducerMarketDTO } from '@src/domain/dtos/producer-market';
import { ICreateProducerMarketUseCase } from '@src/domain/interfaces';
import { ProducerMarket } from '@src/infra/database/entities';
import { ProducerMarketRepository } from '@src/infra/database/repositories';
import { RedisService } from '@src/infra/redis/services';
import { right } from '@src/shared/either';
import { CreateResponse } from '@src/types/responses';

@Injectable()
export class CreateProducerMarketUseCase implements ICreateProducerMarketUseCase {
  private cacheKey = keys.PRODUCER_MARKET_ONLY_MARKET_ID;

  constructor(
    private readonly repository: ProducerMarketRepository,
    private readonly cache: RedisService
  ) {}

  private async updateIdsCache(key: string, ids: string[]): Promise<void> {
    const cache = await this.cache.get<string[]>(key);

    const toUpdate = !cache ? ids : [...cache, ...ids];

    await this.cache.update(key, toUpdate);
  }

  public async exec(
    data: CreateProducerMarketDTO[],
    producerId: string
  ): CreateResponse<ProducerMarket[]> {
    const created = await this.repository.insert(data.map(valeu => ({ ...valeu, producerId })));

    const productIds = created.map(value => value.marketId);

    const key = `${this.cacheKey}${producerId}`;
    await this.updateIdsCache(key, productIds);

    return right(created);
  }
}
