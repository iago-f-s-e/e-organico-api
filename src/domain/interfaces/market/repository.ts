import { IMarket } from './entity';

export interface IMarketRepository {
  findAll(): Promise<IMarket[]>;
  withoutProducerMarket(notInIds: string[]): Promise<IMarket[]>;
  findByIdOrError(id: string): Promise<IMarket>;
}
