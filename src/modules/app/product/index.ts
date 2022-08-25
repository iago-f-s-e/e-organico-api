import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { EntryPoints } from '@src/domain/constants';
import { InfraModule } from '@src/infra';
import { AuthUser } from '@src/modules/auth/middlewares';
import { ProducerProductModule } from '../producer-product';
import { ProductController } from './controllers';
import * as UseCases from './use-cases';

const useCases = Object.values(UseCases);

@Module({
  imports: [InfraModule, ProducerProductModule],
  controllers: [ProductController],
  providers: useCases
})
export class ProductModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthUser)
      .exclude({
        path: EntryPoints.PRODUCT,
        method: RequestMethod.GET
      })
      .forRoutes(EntryPoints.PRODUCT_WITHOUT_PRODUCER_PRODUCT);
  }
}
export const productPrefix: RouteTree = {
  path: '/product',
  module: ProductModule
};
