import { Body, Controller, Post } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { ProducerMarketDTO } from '@src/domain/dtos/producer-market/producer-market.dto';
import { IProducerMarketController } from '@src/domain/interfaces';
import { CreateProducerMarketModel } from '@src/domain/models/app/producer-market';

import { ProducerMarket } from '@src/infra/database/entities';
import { RedisService } from '@src/infra/redis/services';
import { Current } from '@src/modules/common/guard';
import { CurrentUser } from '@src/types/global';
import * as UseCases from '../use-cases';

@Controller()
export class ProducerMarketController implements IProducerMarketController {
  constructor(
    private readonly createUseCase: UseCases.CreateProducerMarketUseCase,
    private readonly cache: RedisService
  ) {}

  private async delRelationalCache(producerId: string): Promise<void> {
    const relational = [`${keys.MARKETS_WITHOUT_PRODUCER_MARKET}${producerId}`];

    await this.cache.del(...relational);
  }

  @Post()
  public async create(
    @Body() body: ProducerMarketDTO[],
    @Current() current: CurrentUser
  ): Promise<ProducerMarket[]> {
    const producerProduct = body.map(
      producerProduct => new CreateProducerMarketModel(producerProduct).value
    );

    const createOrError = await this.createUseCase.exec(producerProduct, current.id);

    if (createOrError.isLeft()) throw createOrError.value;

    await this.delRelationalCache(current.id);

    return createOrError.value;
  }
}
