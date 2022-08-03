import { UpdateAddressDTO } from '@src/domain/dtos/address';
import { UpdateResult } from 'typeorm';
import { IAddress } from './entity';

export interface IUpdateAddressUseCase {
  exec(data: UpdateAddressDTO): Promise<IAddress | UpdateResult>;
}
