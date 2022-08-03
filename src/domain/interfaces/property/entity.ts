import { IAddress } from '../address';
import { IProducer } from '../producer';

export interface IProperty {
  id: string;
  producerId: string;
  name: string;
  isActive: boolean;
  producer: IProducer;
  address: IAddress;
}
