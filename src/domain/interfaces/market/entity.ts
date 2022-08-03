import { IAddress } from '../address';
import { IProducerMarket } from '../producer-market';
import { IScore } from '../score';
import { ITransaction } from '../transaction';
import { IWorkday } from '../workday';

export interface IMarket {
  id: string;
  name: string;
  isActive: boolean;
  workdays: IWorkday[];
  producerMarkets: IProducerMarket[];
  transactions: ITransaction[];
  address: IAddress;
  score: IScore;
}
