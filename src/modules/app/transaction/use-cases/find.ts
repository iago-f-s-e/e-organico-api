import { Injectable } from '@nestjs/common';
import { IFindTransactionUseCase } from '@src/domain/interfaces';
import { Transaction } from '@src/infra/database/entities';
import { TransactionRepository } from '@src/infra/database/repositories';
import { right } from '@src/shared/either';
import { CurrentUser } from '@src/types/global';
import { FindResponse } from '@src/types/responses';

@Injectable()
export class FindTransactionUseCase implements IFindTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  private async producerTransactionById(id: string): FindResponse<Transaction> {
    return right(await this.repository.findProducerTransactionById(id));
  }

  private async consumerTransactionById(id: string): FindResponse<Transaction> {
    return right(await this.repository.findConsumerTransactionById(id));
  }

  public findInProgress(current: CurrentUser): Promise<Transaction[]> {
    if (current.userType === 'consumer')
      return this.repository.findConsumerTransactionInProgress(current.id);

    return this.repository.findProducerTransactionInProgress(current.id);
  }

  public findConcluded(current: CurrentUser): Promise<Transaction[]> {
    if (current.userType === 'consumer')
      return this.repository.findConsumerTransactionConcluded(current.id);

    return this.repository.findProducerTransactionConcluded(current.id);
  }

  public findPending(current: CurrentUser): Promise<Transaction[]> {
    if (current.userType === 'consumer') return Promise.resolve([]);

    return this.repository.findProducerTransactionByStatus(
      current.id,
      'waiting-for-confirmation-from-the-producer'
    );
  }

  public findInSeparation(current: CurrentUser): Promise<Transaction[]> {
    if (current.userType === 'consumer') return Promise.resolve([]);

    return this.repository.findProducerTransactionByStatus(current.id, 'in-separation');
  }

  public findById(id: string, current: CurrentUser): FindResponse<Transaction> {
    if (current.userType === 'consumer') return this.consumerTransactionById(id);

    return this.producerTransactionById(id);
  }
}
