import { TransactionType } from '@src/types/entities';
import { StringOrNil } from '@src/types/global';
import { CreateTransactionProductDTO } from '../transaction-product';

export type CreateTransactionDTO = {
  consumerId: string;
  producerId: string;
  paymentId: string;
  selectedDayId: StringOrNil;
  marketId: StringOrNil;
  addressId: StringOrNil;
  total: number;
  productQuantity: number;
  type: TransactionType;
  transactionProducts: CreateTransactionProductDTO[];
};
