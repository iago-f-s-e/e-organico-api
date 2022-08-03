import { GetProducerProduct, ProducerProductDTO } from '@src/domain/dtos/producer-product';
import { CurrentUser } from '@src/types/global';
import { IProducerProduct } from './entity';

export interface IProducerProductController {
  create(body: ProducerProductDTO): Promise<IProducerProduct>;
  update(id: string, body: ProducerProductDTO, current: CurrentUser): Promise<void>;
  inactive(id: string, current: CurrentUser): Promise<void>;
  getOwnProduct(current: CurrentUser): GetProducerProduct;
  getById(id: string): GetProducerProduct;
}
