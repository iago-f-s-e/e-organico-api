import {
  CreateProducerProductDTO,
  UpdateProducerProductDTO
} from '@src/domain/dtos/producer-product';
import { CreateResponse, FindResponse } from '@src/types/responses';
import { IProducerProduct } from './entity';

export interface ICreateProducerProductUseCase {
  exec(data: CreateProducerProductDTO): CreateResponse<IProducerProduct>;
}

export interface IUpdateProducerProductUseCase {
  inactive(id: string): Promise<void>;
  exec(id: string, data: UpdateProducerProductDTO): Promise<void>;
}

export interface IFindProducerProductUseCase {
  byId(id: string): FindResponse<IProducerProduct>;
  byProducerId(id: string): Promise<IProducerProduct[]>;
  onlyProductIdByProducerId(id: string): Promise<string[]>;
}
