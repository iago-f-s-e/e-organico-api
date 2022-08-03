import { UpdateAddressDTO } from '@src/domain/dtos/address';
import { UpdateResult } from 'typeorm';
import { IAddress } from './entity';

export interface IAddressRepository {
  insert(data: Omit<UpdateAddressDTO, 'id'>): Promise<IAddress>;
  update(data: Omit<UpdateAddressDTO, 'userId'>): Promise<UpdateResult>;
}
