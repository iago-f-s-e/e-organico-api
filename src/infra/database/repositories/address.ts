import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAddressDTO } from '@src/domain/dtos/address';
import { IAddressRepository } from '@src/domain/interfaces';
import { Address } from '@src/infra/database/entities';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(@InjectRepository(Address) private readonly address: Repository<Address>) {}

  public insert(data: Omit<UpdateAddressDTO, 'id'>): Promise<Address> {
    return this.address.save(this.address.create(data));
  }

  public update(data: Omit<UpdateAddressDTO, 'userId'>): Promise<UpdateResult> {
    return this.address.update({ id: data.id }, data);
  }
}
