import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { GetProducer, MinimalProducerToClient } from '@src/domain/dtos/producer';
import { IProducerController } from '@src/domain/interfaces';
import { minimalProducerToClient, producerToClient } from '@src/domain/toClient';
import { RedisService } from '@src/infra/redis/services';
import { FindProducerUseCase } from '../use-cases';

@Controller()
export class ProducerController implements IProducerController {
  private cacheKey = keys.PRODUCERS;

  constructor(
    private readonly findUseCase: FindProducerUseCase,
    private readonly cache: RedisService
  ) {}

  private getCache(): Promise<MinimalProducerToClient[] | null> {
    return this.cache.get<MinimalProducerToClient[]>(this.cacheKey);
  }

  private async setCache(markets: MinimalProducerToClient[]): Promise<void> {
    await this.cache.set(this.cacheKey, markets);
  }

  @Get(':id')
  public async getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): GetProducer {
    const producer = await this.findUseCase.findById(id);

    if (producer.isLeft()) throw producer.value;

    return producerToClient(producer.value);
  }

  @Get()
  public async getAllProducers(): GetProducer {
    const cache = await this.getCache();

    if (cache) return cache;

    const producers = (await this.findUseCase.exec()).map(producer =>
      minimalProducerToClient(producer)
    );

    await this.setCache(producers);

    return producers;
  }
}
