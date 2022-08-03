import { GetTransaction, TransactionDTO } from '@src/domain/dtos/transaction';
import { CurrentUser } from '@src/types/global';
import { ITransaction } from './entity';

export interface ITransactionController {
  create(body: TransactionDTO, consumer: CurrentUser): Promise<ITransaction>;
  confirm(id: string, current: CurrentUser): void;
  cancel(id: string, current: CurrentUser): void;
  separate(id: string): void;
  deliver(id: string): void;
  getInProgress(current: CurrentUser): GetTransaction;
  getInSeparation(current: CurrentUser): GetTransaction;
  getPending(current: CurrentUser): GetTransaction;
  getConcluded(current: CurrentUser): GetTransaction;
  getById(id: string, current: CurrentUser): GetTransaction;
}
