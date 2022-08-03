import { TransactionStatus, TransactionType, Weekday } from '@src/types/entities';
import { PaymentToClient } from '../payment';
import { ProducerWithAddressAndPropertyToClient } from '../producer';
import { TransactionProductToClient } from '../transaction-product';
import { UserToClient } from '../user';

export type MutualTransactionToClient = {
  id: string;
  total: number;
  productQuantity: number;
  status: TransactionStatus;
  type: TransactionType;
  number: number;
  market: {
    id: string;
    name: string;
  };
  payment: {
    id: string;
    name: string;
  };
};

export type MinimalConsumerTransactionToClient = MutualTransactionToClient & {
  producer: {
    id: string;
    name: string;
  };
};

export type MinimalProducerTransactionToClient = MutualTransactionToClient & {
  createdAt: Date;
  selectedDay: {
    id: string;
    weekday: Weekday;
  };
  consumer: {
    id: string;
    name: string;
  };
};

export type ProducerTransactionToClient = MinimalProducerTransactionToClient & {
  consumer: UserToClient;
  products: TransactionProductToClient[];
  payment: PaymentToClient;
};

export type ConsumerTransactionToClient = MinimalConsumerTransactionToClient & {
  producer: ProducerWithAddressAndPropertyToClient;
  products: TransactionProductToClient[];
  payment: PaymentToClient;
  selectedDay: {
    id: string;
    weekday: Weekday;
  };
};
