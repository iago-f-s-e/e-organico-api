import { IProduct } from './entity';

export interface IFindProductUseCase {
  exec(): Promise<IProduct[]>;
}
