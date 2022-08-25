import { IProduct } from './entity';

export interface IFindProductUseCase {
  withoutProducerProduct(producerId: string): Promise<IProduct[]>;
  exec(): Promise<IProduct[]>;
}
