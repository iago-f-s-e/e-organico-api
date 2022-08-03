import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaymentRepository } from '@src/domain/interfaces';
import { Repository } from 'typeorm';
import { Payment } from '../entities';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(@InjectRepository(Payment) private readonly payment: Repository<Payment>) {}

  public findAll(): Promise<Payment[]> {
    return this.payment.find();
  }
}
