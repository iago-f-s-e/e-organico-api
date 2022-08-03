import { CurrentUser } from '@src/types/global';
import * as dtos from '../dtos/transaction';
import { ITransaction } from '../interfaces';
import { paymentToClient } from './payment';
import { producerWithAddressAndPropertyToClient } from './producer';
import { transactionProductToClient } from './transaction-product';
import { userToClient } from './user';

type MutualToClient = (transaction: ITransaction) => dtos.MutualTransactionToClient;
type MinimalConsumerToClient = (
  transaction: ITransaction
) => dtos.MinimalConsumerTransactionToClient;
type MinimalProducerToClient = (
  transaction: ITransaction
) => dtos.MinimalProducerTransactionToClient;
type ProducerToClient = (transaction: ITransaction) => dtos.ProducerTransactionToClient;
type ConsumerToClient = (transaction: ITransaction) => dtos.ConsumerTransactionToClient;

type MinimalToClient = (
  transaction: ITransaction,
  current: CurrentUser
) => dtos.MinimalConsumerTransactionToClient | dtos.MinimalProducerTransactionToClient;

type ToClient = (
  transaction: ITransaction,
  current: CurrentUser
) => dtos.ProducerTransactionToClient | dtos.ConsumerTransactionToClient;

export const minimalTransactionToClient: MinimalToClient = (transaction, current) => {
  if (current.userType === 'consumer') return minimalConsumerTransactionToClient(transaction);

  return minimalProducerTransactionToClient(transaction);
};

export const transactionToClient: ToClient = (transaction, current) => {
  if (current.userType === 'consumer') return consumerTransactionToClient(transaction);

  return producerTransactionToClient(transaction);
};

const mutualToClient: MutualToClient = transaction => ({
  id: transaction.id,
  total: transaction.total,
  productQuantity: transaction.productQuantity,
  status: transaction.status,
  type: transaction.type,
  number: transaction.number,
  market: {
    id: transaction.market.id,
    name: transaction.market.name
  },
  payment: {
    id: transaction.payment.id,
    name: transaction.payment.name
  }
});

const minimalConsumerTransactionToClient: MinimalConsumerToClient = transaction => ({
  ...mutualToClient(transaction),
  producer: {
    id: transaction.producer.id,
    name: transaction.producer.user.name
  }
});

const minimalProducerTransactionToClient: MinimalProducerToClient = transaction => ({
  ...mutualToClient(transaction),
  createdAt: transaction.createdAt,
  selectedDay: {
    id: transaction.selectedDay.id,
    weekday: transaction.selectedDay.weekday
  },
  consumer: {
    id: transaction.consumer.id,
    name: transaction.consumer.name
  }
});

const producerTransactionToClient: ProducerToClient = transaction => ({
  ...minimalProducerTransactionToClient(transaction),
  consumer: userToClient(transaction.consumer),
  payment: paymentToClient(transaction.payment),
  products: transaction.transactionProducts.map(transactionProduct =>
    transactionProductToClient(transactionProduct)
  )
});

const consumerTransactionToClient: ConsumerToClient = transaction => ({
  ...minimalConsumerTransactionToClient(transaction),
  selectedDay: {
    id: transaction.selectedDay.id,
    weekday: transaction.selectedDay.weekday
  },
  producer: producerWithAddressAndPropertyToClient(transaction.producer),
  payment: paymentToClient(transaction.payment),
  products: transaction.transactionProducts.map(transactionProduct =>
    transactionProductToClient(transactionProduct)
  )
});
