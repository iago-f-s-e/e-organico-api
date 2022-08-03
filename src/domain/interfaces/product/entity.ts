import { IProducerProduct } from '../producer-product';

export interface IProduct {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  producerProducts: IProducerProduct[];
}
