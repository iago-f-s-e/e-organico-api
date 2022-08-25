import { Injectable } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { CreateProducerProductDTO } from '@src/domain/dtos/producer-product';
import { ICreateProducerProductUseCase } from '@src/domain/interfaces';
import { ProducerProduct } from '@src/infra/database/entities';
import { ProducerProductRepository } from '@src/infra/database/repositories';
import { RedisService } from '@src/infra/redis/services';
import { right } from '@src/shared/either';
import { CreateResponse } from '@src/types/responses';

@Injectable()
export class CreateProducerProductUseCase implements ICreateProducerProductUseCase {
  private cacheKey = keys.PRODUCER_PRODUCT_ONLY_PRODUCT_ID;

  constructor(
    private readonly repository: ProducerProductRepository,
    private readonly cache: RedisService
  ) {}

  private async updateIdsCache(key: string, ids: string[]): Promise<void> {
    const cache = await this.cache.get<string[]>(key);

    const toUpdate = !cache ? ids : [...cache, ...ids];

    await this.cache.update(key, toUpdate);
  }

  public async exec(
    data: CreateProducerProductDTO[],
    producerId: string
  ): CreateResponse<ProducerProduct[]> {
    const created = await this.repository.insert(data.map(valeu => ({ ...valeu, producerId })));

    const productIds = created.map(value => value.productId);

    const key = `${this.cacheKey}${producerId}`;
    await this.updateIdsCache(key, productIds);

    return right(created);
  }
}
