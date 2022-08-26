import { IMarket } from './entity';

export interface IFindMarketUseCase {
  findById(id: string): Promise<IMarket>;
  withoutProducerMarket(producerId: string): Promise<IMarket[]>;
  exec(): Promise<IMarket[]>;
}
