import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { GetMarket, MinimalMarketToClient } from '@src/domain/dtos/market';
import { IMarketController } from '@src/domain/interfaces';
import { marketToClient, minimalMarketToClient } from '@src/domain/toClient';
import { RedisService } from '@src/infra/redis/services';
import { Current } from '@src/modules/common/guard';
import { CurrentUser } from '@src/types/global';
import { FindMarketUseCase } from '../use-cases';

@Controller()
export class MarketController implements IMarketController {
  private cacheKey = keys.MARKETS;
  private cacheKeyWithoutProducerMarket = keys.MARKETS_WITHOUT_PRODUCER_MARKET;

  constructor(
    private readonly findUseCase: FindMarketUseCase,
    private readonly cache: RedisService
  ) {}

  private getCache(key?: string): Promise<MinimalMarketToClient[] | null> {
    return this.cache.get<MinimalMarketToClient[]>(key || this.cacheKey);
  }

  private async setCache(markets: MinimalMarketToClient[], key?: string): Promise<void> {
    await this.cache.set(key || this.cacheKey, markets);
  }

  @Get()
  public async getAll(): GetMarket {
    const cache = await this.getCache();

    if (cache) return cache;

    const markets = (await this.findUseCase.exec()).map(market => minimalMarketToClient(market));

    this.setCache(markets);

    return markets;
  }

  @Get('without-producer-market')
  public async getWithoutProducerMarket(@Current() current: CurrentUser): GetMarket {
    const key = `${this.cacheKeyWithoutProducerMarket}${current.id}`;

    const cache = await this.getCache(key);

    if (cache) return cache;

    const markets = (await this.findUseCase.withoutProducerMarket(current.id)).map(market =>
      minimalMarketToClient(market)
    );

    this.setCache(markets, key);

    return markets;
  }

  @Get(':id')
  public async getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): GetMarket {
    return marketToClient(await this.findUseCase.findById(id));
  }
}
