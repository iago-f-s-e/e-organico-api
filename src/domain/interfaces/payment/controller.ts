import { IPayment } from './entity';

export interface IPaymentController {
  getAll(): Promise<IPayment[]>;
}
