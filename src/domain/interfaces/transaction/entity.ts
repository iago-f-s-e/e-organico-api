import { TransactionStatus, TransactionType } from '@src/types/entities';
import { StringOrNil } from '@src/types/global';
import { IAddress } from '../address';
import { IMarket } from '../market';
import { IPayment } from '../payment';
import { IProducer } from '../producer';
import { ITransactionProduct } from '../transaction-product';
import { IUser } from '../user';
import { IWorkday } from '../workday';

export interface ITransaction {
  id: string;
  number: number;
  consumerId: string;
  producerId: string;
  paymentId: string;
  selectedDayId: StringOrNil;
  marketId: StringOrNil;
  addressId: StringOrNil;
  total: number;
  productQuantity: number;
  type: TransactionType;
  status: TransactionStatus;
  description: StringOrNil;
  observation: StringOrNil;
  createdAt: Date;
  updatedAt: Date;
  consumer: IUser;
  producer: IProducer;
  payment: IPayment;
  selectedDay: IWorkday;
  market: IMarket;
  address: IAddress;
  transactionProducts: ITransactionProduct[];
}
