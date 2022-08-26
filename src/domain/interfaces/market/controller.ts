import { GetMarket } from '@src/domain/dtos/market';
import { CurrentUser } from '@src/types/global';

export interface IMarketController {
  getById(id: string): GetMarket;
  getWithoutProducerMarket(current: CurrentUser): GetMarket;
  getAll(): GetMarket;
}
