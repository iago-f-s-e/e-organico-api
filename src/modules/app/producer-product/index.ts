import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { EntryPoints } from '@src/domain/constants';
import { InfraModule } from '@src/infra';
import { AuthUser } from '@src/modules/auth/middlewares';
import { CommonModule } from '@src/modules/common';
import { ProducerProductController } from './controllers';
import * as UseCases from './use-cases';

const useCases = Object.values(UseCases);

@Module({
  imports: [InfraModule, CommonModule],
  controllers: [ProducerProductController],
  exports: useCases,
  providers: useCases
})
export class ProducerProductModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthUser).forRoutes(EntryPoints.PRODUCER_PRODUCT);
  }
}

export const producerProductPrefix: RouteTree = {
  path: '/producer-product',
  module: ProducerProductModule
};
