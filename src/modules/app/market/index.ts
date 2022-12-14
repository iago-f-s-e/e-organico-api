import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { EntryPoints } from '@src/domain/constants';
import { InfraModule } from '@src/infra';
import { AuthUser } from '@src/modules/auth/middlewares';
import { ProducerMarketModule } from '../producer-market';
import { MarketController } from './controllers';
import * as UseCases from './use-cases';

const useCases = Object.values(UseCases);

@Module({
  imports: [InfraModule, ProducerMarketModule],
  controllers: [MarketController],
  providers: useCases
})
export class MarketModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthUser).forRoutes(EntryPoints.MARKET_WITHOUT_PRODUCER_MARKET);
  }
}

export const marketPrefix: RouteTree = {
  path: '/market',
  module: MarketModule
};
