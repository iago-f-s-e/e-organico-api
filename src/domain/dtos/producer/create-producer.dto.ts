import { CertificationType } from '@src/types/entities';
import { CreateProducerMarketDTO } from '../producer-market';
import { CreateProducerProductDTO } from '../producer-product';

export type CreateProducerDTO = {
  makeDelivery: boolean;
  certificationType: CertificationType;
  producerProducts: CreateProducerProductDTO[];
  producerMarkets: CreateProducerMarketDTO[];
};
