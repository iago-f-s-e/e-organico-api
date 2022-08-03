import { AddressToClient } from '../address';
import { MinimalProducerToClient } from '../producer';
import { MarketScoreToClient } from '../score';
import { WorkdayToClient } from '../workday';

export type MinimalMarketToClient = {
  id: string;
  name: string;
  image: string;
  address: AddressToClient;
  workdays: WorkdayToClient[];
  score: MarketScoreToClient;
};

export type MarketToClient = MinimalMarketToClient & {
  producers: MinimalProducerToClient[];
};
