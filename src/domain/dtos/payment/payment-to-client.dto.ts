import { PaymentType } from '@src/types/entities';

export type PaymentToClient = {
  id: string;
  name: string;
  type: PaymentType;
};
