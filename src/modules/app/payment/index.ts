import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { EntryPoints } from '@src/domain/constants';
import { InfraModule } from '@src/infra';
import { AuthUser } from '@src/modules/auth/middlewares';
import { CommonModule } from '@src/modules/common';
import { PaymentController } from './controllers';

import * as UseCases from './use-cases';

const useCases = Object.values(UseCases);

@Module({
  imports: [InfraModule, CommonModule],
  controllers: [PaymentController],
  providers: useCases
})
export class PaymentModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthUser).forRoutes(EntryPoints.PAYMENT);
  }
}

export const paymentPrefix: RouteTree = {
  path: '/payment',
  module: PaymentModule
};
