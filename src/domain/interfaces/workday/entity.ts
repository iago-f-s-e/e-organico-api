import { Weekday } from '@src/types/entities';
import { IMarket } from '../market';
import { ITransaction } from '../transaction';

export interface IWorkday {
  id: string;
  marketId: string;
  weekday: Weekday;
  opening: string;
  closing: string;
  isActive: boolean;
  market: IMarket;
  transactions: ITransaction[];
}
