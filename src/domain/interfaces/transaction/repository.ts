import { CreateTransactionDTO } from '@src/domain/dtos/transaction';
import { TransactionStatus } from '@src/types/entities';
import { UpdateResult } from 'typeorm';
import { ITransaction } from './entity';

export interface ITransactionRepository {
  insert(data: CreateTransactionDTO): Promise<ITransaction>;
  updateStatus(id: string, status: TransactionStatus): Promise<UpdateResult>;
  findProducerTransactionById(id: string): Promise<ITransaction>;
  findConsumerTransactionById(id: string): Promise<ITransaction>;
  findConsumerTransactionInProgress(consumerId: string): Promise<ITransaction[]>;
  findProducerTransactionInProgress(producerId: string): Promise<ITransaction[]>;
  findProducerTransactionConcluded(producerId: string): Promise<ITransaction[]>;
  findConsumerTransactionConcluded(consumerId: string): Promise<ITransaction[]>;
  findConsumerTransactionByStatus(
    consumerId: string,
    status: TransactionStatus
  ): Promise<ITransaction[]>;
  findProducerTransactionByStatus(
    producerId: string,
    status: TransactionStatus
  ): Promise<ITransaction[]>;
}
