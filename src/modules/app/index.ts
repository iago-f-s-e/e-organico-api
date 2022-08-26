import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { marketPrefix, MarketModule } from './market';
import { paymentPrefix, PaymentModule } from './payment';
import { producerPrefix, ProducerModule } from './producer';
import { ProducerMarketModule, producerMarketPrefix } from './producer-market';
import { producerProductPrefix, ProducerProductModule } from './producer-product';
import { productPrefix, ProductModule } from './product';
import { transactionPrefix, TransactionModule } from './transaction';
import { unitMeasurePrefix, UnitMeasureModule } from './unit-measure';

const modules = [
  ProducerModule,
  ProducerProductModule,
  ProducerMarketModule,
  ProductModule,
  MarketModule,
  UnitMeasureModule,
  TransactionModule,
  PaymentModule
].sort((prev, next) =>
  prev.name.replace('Module', '').localeCompare(next.name.replace('Module', ''))
);

const prefixes = [
  producerPrefix,
  producerProductPrefix,
  producerMarketPrefix,
  marketPrefix,
  productPrefix,
  unitMeasurePrefix,
  transactionPrefix,
  paymentPrefix
].sort((prev, next) => prev.path.localeCompare(next.path));

@Module({ imports: [...modules] })
export class AppModule {}

export const appPrefix: RouteTree = {
  path: '/api',
  module: AppModule,
  children: [...prefixes]
};
