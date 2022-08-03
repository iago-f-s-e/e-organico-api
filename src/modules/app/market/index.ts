import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { InfraModule } from '@src/infra';
import { MarketController } from './controllers';
import * as UseCases from './use-cases';

const useCases = Object.values(UseCases);

@Module({
  imports: [InfraModule],
  controllers: [MarketController],
  providers: useCases
})
export class MarketModule {}

export const marketPrefix: RouteTree = {
  path: '/market',
  module: MarketModule
};
