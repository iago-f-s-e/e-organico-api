import { IMarket } from '../market';
import { IProducer } from '../producer';

export interface IProducerMarket {
  producerId: string;
  marketId: string;
  isActive: boolean;
  market: IMarket;
  producer: IProducer;
}
