import { CreateProducerMarketDTO } from '@src/domain/dtos/producer-market';
import { CreateResponse } from '@src/types/responses';
import { IProducerMarket } from './entity';

export interface ICreateProducerMarketUseCase {
  exec(data: CreateProducerMarketDTO[], producerId: string): CreateResponse<IProducerMarket[]>;
}

export interface IFindProducerMarketUseCase {
  onlyMarketIdByProducerId(id: string): Promise<string[]>;
}
