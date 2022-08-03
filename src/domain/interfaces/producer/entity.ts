import { CertificationType, ProducerStatus } from '@src/types/entities';
import { IProducerMarket } from '../producer-market';
import { IProducerProduct } from '../producer-product';
import { IProperty } from '../property';
import { ITransaction } from '../transaction';
import { IUser } from '../user';

export interface IProducer {
  id: string;
  makeDelivery: boolean;
  status: ProducerStatus;
  certificationType: CertificationType;
  user: IUser;
  producerProducts: IProducerProduct[];
  producerMarkets: IProducerMarket[];
  properties: IProperty[];
  transactions: ITransaction[];
}
