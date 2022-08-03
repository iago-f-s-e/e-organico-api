import { IProducerProduct } from '../producer-product';

export interface IUnitMeasure {
  id: string;
  name: string;
  abbreviation: string;
  isActive: boolean;
  producerProducts: IProducerProduct[];
}
