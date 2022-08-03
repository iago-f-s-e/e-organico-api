import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { marketPrefix, MarketModule } from './market';
import { paymentPrefix, PaymentModule } from './payment';
import { producerPrefix, ProducerModule } from './producer';
import { producerProductPrefix, ProducerProductModule } from './producer-product';
import { productPrefix, ProductModule } from './product';
import { transactionPrefix, TransactionModule } from './transaction';
import { unitMeasurePrefix, UnitMeasureModule } from './unit-measure';

@Module({
  imports: [
    ProducerProductModule,
    MarketModule,
    ProductModule,
    UnitMeasureModule,
    ProducerModule,
    TransactionModule,
    PaymentModule
  ]
})
export class AppModule {}

export const appPrefix: RouteTree = {
  path: '/api',
  module: AppModule,
  children: [
    producerProductPrefix,
    marketPrefix,
    productPrefix,
    unitMeasurePrefix,
    producerPrefix,
    transactionPrefix,
    paymentPrefix
  ]
};
