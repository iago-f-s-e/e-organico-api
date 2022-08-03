import { GetProduct } from '@src/domain/dtos/product';

export interface IProductController {
  getAll(): GetProduct;
}
