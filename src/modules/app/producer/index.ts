import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
  controllers: controllers,
  providers: useCases
})
export class ProducerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthUser)
      .exclude({
        path: EntryPoints.PRODUCER,
        method: RequestMethod.GET
      })
      .forRoutes(EntryPoints.PRODUCER);
  }
}

export const producerPrefix: RouteTree = {
  path: '/producer',
  module: ProducerModule
};
