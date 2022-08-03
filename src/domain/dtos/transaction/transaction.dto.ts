import { TransactionType } from '@src/types/entities';
import { TransactionProductDTO } from '../transaction-product';

type Information = {
  type: TransactionType;
  address?: { id: string };
  selectedDay?: { id: string };
  market?: { id: string };
};

export type TransactionDTO = {
  id: string;
  total: string;
  productQuantity: string;
  producer: { id: string };
  consumer: { id: string };
  payment: { id: string };
  products: TransactionProductDTO[];
  information: Information;
};
