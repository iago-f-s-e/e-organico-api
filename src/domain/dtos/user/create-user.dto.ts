import { IScore } from '@src/domain/interfaces';
import { CreateAddressDTO } from '../address';
import { CreateProducerDTO } from '../producer';

export type CreateUserDTO = {
  name: string;
  phone: string;
  email: string;
  document: string;
  password: string;
  address: CreateAddressDTO[];
  producer?: CreateProducerDTO;
  score: IScore;
};
