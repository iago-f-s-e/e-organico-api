import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { EntryPoints } from '@src/domain/constants';
import { InfraModule } from '@src/infra';
import { AuthUser } from '@src/modules/auth/middlewares';
import { CommonModule } from '@src/modules/common';

import * as Controllers from './controllers';
import * as UseCases from './use-cases';

const controllers = Object.values(Controllers);
const useCases = Object.values(UseCases);

@Module({
  imports: [InfraModule, CommonModule],
  controllers,
  providers: useCases
})
export class TransactionModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthUser).forRoutes(EntryPoints.TRANSACTION);
  }
}

export const transactionPrefix: RouteTree = {
  path: '/transaction',
  module: TransactionModule
};
