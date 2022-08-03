import { capitalize } from '@src/shared/functions';
import {
  MinimalProducerToClient,
  ProducerToClient,
  ProducerWithAddressAndPropertyToClient
} from '../dtos/producer';
import { IProducer } from '../interfaces';
import { addressToClient } from './address';
import { minimalMarketToClient } from './market';
import { minimalProducerProductToClient } from './producer-product';

type MinimalToClient = (producer: IProducer) => MinimalProducerToClient;
type WithAddressAndPropertyToClient = (
  producer: IProducer
) => ProducerWithAddressAndPropertyToClient;
type ToClient = (producer: IProducer) => ProducerToClient;

const defaultImage =
  'https://www.amigodoclima.com.br/wp-content/themes/amigodoclima/img/not-available.png';

export const minimalProducerToClient: MinimalToClient = producer => ({
  id: producer.id,
  name: capitalize(producer.user.name),
  image: defaultImage,
  score: {
    rating: producer.user.score.rating,
    transactions: producer.user.score.transactions
  }
});

export const producerWithAddressAndPropertyToClient: WithAddressAndPropertyToClient = producer => ({
  ...minimalProducerToClient(producer),
  address: addressToClient(producer.user.address[0]),
  property: {
    images: [
      { image: defaultImage },
      { image: defaultImage },
      { image: defaultImage },
      { image: defaultImage }
    ]
  }
});

export const producerToClient: ToClient = producer => ({
  ...producerWithAddressAndPropertyToClient(producer),
  markets: producer.producerMarkets
    .map(producerMarket => minimalMarketToClient(producerMarket.market))
    .sort((prev, next) => prev.name.localeCompare(next.name)),
  products: producer.producerProducts
    .map(producerProduct => minimalProducerProductToClient(producerProduct))
    .sort((prev, next) => prev.name.localeCompare(next.name))
});
