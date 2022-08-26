import { ProducerMarketDTO } from '@src/domain/dtos/producer-market';
import { CurrentUser } from '@src/types/global';
import { IProducerMarket } from './entity';

export interface IProducerMarketController {
  create(body: ProducerMarketDTO[], current: CurrentUser): Promise<IProducerMarket[]>;

  // TODO: criar inativação
  // inactive(id: string, current: CurrentUser): Promise<void>;
}
