import { GetMarket } from '@src/domain/dtos/market';

export interface IMarketController {
  getById(id: string): GetMarket;
  getAll(): GetMarket;
}
