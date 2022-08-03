import { PaymentType } from '@src/types/entities';
import { ITransaction } from '../transaction';

export interface IPayment {
  id: string;
  name: string;
  type: PaymentType;
  transactions: ITransaction[];
}
