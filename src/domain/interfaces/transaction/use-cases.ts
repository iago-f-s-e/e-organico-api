import { CreateTransactionDTO } from '@src/domain/dtos/transaction';
import { CurrentUser } from '@src/types/global';
import { FindResponse } from '@src/types/responses';
import { ITransaction } from './entity';

export interface ICreateTransactionUseCase {
  exec(data: CreateTransactionDTO): Promise<ITransaction>;
}

export interface IUpdateTransactionUseCase {
  confirm(id: string, current: CurrentUser): void;
  cancel(id: string, current: CurrentUser): void;
  separate(id: string): void;
  deliver(id: string): void;
}

export interface IFindTransactionUseCase {
  findInProgress(current: CurrentUser): Promise<ITransaction[]>;
  findConcluded(current: CurrentUser): Promise<ITransaction[]>;
  findPending(current: CurrentUser): Promise<ITransaction[]>;
  findInSeparation(current: CurrentUser): Promise<ITransaction[]>;
  findById(id: string, current: CurrentUser): FindResponse<ITransaction>;
}
