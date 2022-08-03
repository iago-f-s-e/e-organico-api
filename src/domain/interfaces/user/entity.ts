import { IAddress } from '../address';
import { IProducer } from '../producer';
import { IScore } from '../score';
import { ITransaction } from '../transaction';

export interface IUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  document: string;
  password: string;
  isActive: boolean;
  address: IAddress[];
  transactions: ITransaction[];
  producer: IProducer;
  score: IScore;
}
