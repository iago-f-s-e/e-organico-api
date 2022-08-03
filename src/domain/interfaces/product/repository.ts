import { IProduct } from './entity';

export interface IProductRepository {
  findAll(): Promise<IProduct[]>;
}
