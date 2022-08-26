import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProducerMarketDTO } from '@src/domain/dtos/producer-market';

import { IProducerMarketRepository } from '@src/domain/interfaces';
import { Repository } from 'typeorm';
import { ProducerMarket } from '../entities';

@Injectable()
export class ProducerMarketRepository implements IProducerMarketRepository {
  constructor(
    @InjectRepository(ProducerMarket) private readonly producerProduct: Repository<ProducerMarket>
  ) {}

  public insert(
    data: Array<CreateProducerMarketDTO & { producerId: string }>
  ): Promise<ProducerMarket[]> {
    return this.producerProduct.save(this.producerProduct.create(data));
  }

  public async findOnlyProductIdsByProducerId(producerId: string): Promise<string[]> {
    return (
      await this.producerProduct.find({
        where: { producerId, isActive: true },
        select: { marketId: true }
      })
    ).map(res => res.marketId);
  }
}
