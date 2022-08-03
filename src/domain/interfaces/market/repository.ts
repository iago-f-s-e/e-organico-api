import { IMarket } from './entity';

export interface IMarketRepository {
  findAll(): Promise<IMarket[]>;
  findByIdOrError(id: string): Promise<IMarket>;
}
