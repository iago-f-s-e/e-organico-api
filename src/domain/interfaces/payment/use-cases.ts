import { IPayment } from './entity';

export interface IFindPaymentUseCase {
  exec(): Promise<IPayment[]>;
}
