import { AddressToClient } from '../address';
import { MinimalMarketToClient } from '../market';
import { MinimalProducerProductToClient } from '../producer-product';
import { PropertyImageToClient } from '../property';
import { ScoreToClient } from '../score';

export type MinimalProducerToClient = {
  id: string;
  name: string;
  image: string;
  score: ScoreToClient;
};

export type ProducerWithAddressAndPropertyToClient = MinimalProducerToClient & {
  address: AddressToClient;
  property: {
    images: PropertyImageToClient[];
  };
};

export type ProducerToClient = ProducerWithAddressAndPropertyToClient & {
  address: AddressToClient;
  markets: MinimalMarketToClient[];
  products: MinimalProducerProductToClient[];
  property: {
    images: PropertyImageToClient[];
  };
};
