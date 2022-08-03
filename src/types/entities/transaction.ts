export type TransactionType = 'pick' | 'delivery';

export type TransactionStatus =
  | 'canceled-by-producer'
  | 'canceled-by-consumer'
  | 'confirmed-by-producer'
  | 'confirmed-by-consumer'
  | 'concluded'
  | 'en-route'
  | 'in-separation'
  | 'waiting-for-payment'
  | 'waiting-for-consumer-to-withdraw'
  | 'waiting-for-confirmation-from-the-producer';

export enum transactionType {
  'pick' = 'pick',
  'delivery' = 'delivery'
}
