import {
  ConsumerTransactionToClient,
  MinimalConsumerTransactionToClient,
  MinimalProducerTransactionToClient,
  ProducerTransactionToClient
} from './transaction-to-client.dto';

export type GetTransaction = Promise<
  | Array<MinimalConsumerTransactionToClient | MinimalProducerTransactionToClient>
  | ProducerTransactionToClient
  | ConsumerTransactionToClient
>;
