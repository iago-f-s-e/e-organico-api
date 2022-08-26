import { CreateProducerMarketDTO } from '@src/domain/dtos/producer-market';
import { IProducerMarket } from './entity';

export interface IProducerMarketRepository {
  insert(data: Array<CreateProducerMarketDTO & { producerId: string }>): Promise<IProducerMarket[]>;
  findOnlyProductIdsByProducerId(producerId: string): Promise<string[]>;

  // TODO: criar inativação
  // inactive(id: string): Promise<UpdateResult>;
}
