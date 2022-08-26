import { ProducerStatus, UserType } from '../entities';
import { Nil } from './nil';

export type CurrentUser = {
  id: string;
  userType: UserType;
  producerStatus: ProducerStatus | Nil;
};
