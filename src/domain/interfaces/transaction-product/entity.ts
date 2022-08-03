import { IProducerProduct } from '../producer-product';
import { ITransaction } from '../transaction';

export interface ITransactionProduct {
  id: string;
  transactionId: string;
  producerProductId: string;
  quantity: number;
  total: number;
  transaction: ITransaction;
  producerProduct: IProducerProduct;
}
