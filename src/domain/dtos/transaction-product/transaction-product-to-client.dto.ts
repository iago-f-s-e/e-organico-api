import { ProducerProductToClient } from '../producer-product';

export type TransactionProductToClient = {
  id: string;
  total: number;
  quantity: number;
  producerProduct: ProducerProductToClient;
};
