import { Injectable } from '@nestjs/common';
import { IFindMarketUseCase } from '@src/domain/interfaces';
import { Market } from '@src/infra/database/entities';
import { MarketRepository } from '@src/infra/database/repositories';
import { FindProducerMarketUseCase } from '../../producer-market/use-cases';

@Injectable()
export class FindMarketUseCase implements IFindMarketUseCase {
  constructor(
    private readonly repository: MarketRepository,
    private readonly findProductProduct: FindProducerMarketUseCase
  ) {}

  public async findById(id: string): Promise<Market> {
    return this.repository.findByIdOrError(id);
  }

  public async withoutProducerMarket(producerId: string): Promise<Market[]> {
    const notInIds = await this.findProductProduct.onlyMarketIdByProducerId(producerId);

    return this.repository.withoutProducerMarket(notInIds);
  }

  public exec(): Promise<Market[]> {
    return this.repository.findAll();
  }
}
