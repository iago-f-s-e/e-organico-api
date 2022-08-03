import { Injectable } from '@nestjs/common';
import { IUpdateTransactionUseCase } from '@src/domain/interfaces';
import { TransactionRepository } from '@src/infra/database/repositories';
import { CurrentUser } from '@src/types/global';

@Injectable()
export class UpdateTransactionUseCase implements IUpdateTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  private confirmTransactionByProducer(id: string): void {
    this.repository.updateStatus(id, 'in-separation').catch(err => console.error(err));
  }

  private confirmTransactionByConsumer(id: string): void {
    this.repository.updateStatus(id, 'concluded').catch(err => console.error(err));
  }

  private cancelTransactionByConsumer(id: string): void {
    this.repository.updateStatus(id, 'canceled-by-consumer').catch(err => console.error(err));
  }

  private cancelTransactionByProducer(id: string): void {
    this.repository.updateStatus(id, 'canceled-by-producer').catch(err => console.error(err));
  }

  public confirm(id: string, current: CurrentUser): void {
    if (current.userType === 'consumer') return this.confirmTransactionByConsumer(id);

    return this.confirmTransactionByProducer(id);
  }

  public cancel(id: string, current: CurrentUser): void {
    if (current.userType === 'consumer') return this.cancelTransactionByConsumer(id);

    return this.cancelTransactionByProducer(id);
  }

  public separate(id: string): void {
    this.repository
      .updateStatus(id, 'waiting-for-consumer-to-withdraw')
      .catch(err => console.error(err));
  }

  public deliver(id: string): void {
    this.repository.updateStatus(id, 'confirmed-by-producer').catch(err => console.error(err));
  }
}
