import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { GetMarket, MinimalMarketToClient } from '@src/domain/dtos/market';
import { IMarketController } from '@src/domain/interfaces';
import { marketToClient, minimalMarketToClient } from '@src/domain/toClient';
import { RedisService } from '@src/infra/redis/services';
import { FindMarketUseCase } from '../use-cases';

@Controller()
export class MarketController implements IMarketController {
  private cacheKey = keys.MARKETS;

  constructor(
    private readonly findUseCase: FindMarketUseCase,
    private readonly cache: RedisService
  ) {}

  private getCache(): Promise<MinimalMarketToClient[] | null> {
    return this.cache.get<MinimalMarketToClient[]>(this.cacheKey);
  }

  private async setCache(markets: MinimalMarketToClient[]): Promise<void> {
    await this.cache.set(this.cacheKey, markets);
  }

  @Get(':id')
  public async getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): GetMarket {
    return marketToClient(await this.findUseCase.findById(id));
  }

  @Get()
  public async getAll(): GetMarket {
    const cache = await this.getCache();

    if (cache) return cache;

    const markets = (await this.findUseCase.exec()).map(market => minimalMarketToClient(market));

    this.setCache(markets);

    return markets;
  }
}
