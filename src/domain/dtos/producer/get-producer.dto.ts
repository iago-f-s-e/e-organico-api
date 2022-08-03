import { ProducerToClient } from '.';
import { MinimalProducerToClient } from './producer-to-client.dto';

export type GetProducer = Promise<ProducerToClient | MinimalProducerToClient[]>;
