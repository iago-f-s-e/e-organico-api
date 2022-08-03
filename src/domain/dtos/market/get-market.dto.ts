import { MarketToClient, MinimalMarketToClient } from './market-to-client.dto';

export type GetMarket = Promise<MarketToClient | MinimalMarketToClient | MinimalMarketToClient[]>;
