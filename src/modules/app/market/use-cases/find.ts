import { Injectable } from '@nestjs/common';
import { IFindMarketUseCase } from '@src/domain/interfaces';
import { Market } from '@src/infra/database/entities';
import { MarketRepository } from '@src/infra/database/repositories';

@Injectable()
export class FindMarketUseCase implements IFindMarketUseCase {
  constructor(private readonly repository: MarketRepository) {}

  public async findById(id: string): Promise<Market> {
    return this.repository.findByIdOrError(id);
  }

  public exec(): Promise<Market[]> {
    return this.repository.findAll();
  }
}
