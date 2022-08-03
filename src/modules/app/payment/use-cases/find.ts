import { Injectable } from '@nestjs/common';
import { IFindPaymentUseCase } from '@src/domain/interfaces';
import { Payment } from '@src/infra/database/entities';
import { PaymentRepository } from '@src/infra/database/repositories';

@Injectable()
export class FindPaymentUseCase implements IFindPaymentUseCase {
  constructor(private readonly repository: PaymentRepository) {}

  public exec(): Promise<Payment[]> {
    return this.repository.findAll();
  }
}
