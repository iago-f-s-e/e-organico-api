import { PaymentToClient } from '../dtos/payment';
import { IPayment } from '../interfaces';

type ToClient = (payment: IPayment) => PaymentToClient;

export const paymentToClient: ToClient = payment => ({
  id: payment.id,
  name: payment.name,
  type: payment.type
});
