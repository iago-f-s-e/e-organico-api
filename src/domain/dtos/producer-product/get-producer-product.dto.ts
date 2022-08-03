import {
  MinimalProducerProductToClient,
  ProducerProductToClient
} from './producer-product-to-client.dto';

export type GetProducerProduct = Promise<
  ProducerProductToClient | MinimalProducerProductToClient[]
>;
