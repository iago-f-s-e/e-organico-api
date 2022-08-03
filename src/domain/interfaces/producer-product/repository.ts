import {
  CreateProducerProductDTO,
  UpdateProducerProductDTO
} from '@src/domain/dtos/producer-product';
import { UpdateResult } from 'typeorm';
import { IProducerProduct } from './entity';

export interface IProducerProductRepository {
  insert(data: CreateProducerProductDTO): Promise<IProducerProduct>;
  update(id: string, data: UpdateProducerProductDTO): Promise<UpdateResult>;
  inactive(id: string): Promise<UpdateResult>;
  findByProducerId(producerId: string): Promise<IProducerProduct[]>;
  findByIdOrError(id: string): Promise<IProducerProduct>;
}
