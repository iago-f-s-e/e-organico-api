import { GetProduct } from '@src/domain/dtos/product';
import { CurrentUser } from '@src/types/global';

export interface IProductController {
  getWithoutProducerProduct(current: CurrentUser): GetProduct;
  getAll(): GetProduct;
}
