import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { InfraModule } from '@src/infra';
import { UnitMeasureController } from './controllers';
import * as UseCases from './use-cases';

const useCases = Object.values(UseCases);

@Module({
  imports: [InfraModule],
  controllers: [UnitMeasureController],
  providers: useCases
})
export class UnitMeasureModule {}

export const unitMeasurePrefix: RouteTree = {
  path: '/unit-measure',
  module: UnitMeasureModule
};
