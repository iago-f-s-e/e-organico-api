import { IPayment } from './entity';

export interface IPaymentRepository {
  findAll(): Promise<IPayment[]>;
}
