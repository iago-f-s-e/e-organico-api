import { TransactionProductToClient } from '../dtos/transaction-product';
import { ITransactionProduct } from '../interfaces';
import { producerProductToClient } from './producer-product';

type ToClient = (transactionProduct: ITransactionProduct) => TransactionProductToClient;

export const transactionProductToClient: ToClient = transactionProduct => ({
  id: transactionProduct.id,
  quantity: transactionProduct.quantity,
  total: transactionProduct.total,
  producerProduct: producerProductToClient(transactionProduct.producerProduct)
});
