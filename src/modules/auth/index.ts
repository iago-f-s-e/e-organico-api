import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';

import { InfraModule } from '@src/infra';
import { CommonModule } from '../common';
import { UserModule } from '../user';

import * as Controllers from './controllers';
import * as Services from './services';

const controllers = Object.values(Controllers);
const services = Object.values(Services);

@Module({
  imports: [UserModule, CommonModule, InfraModule],
  controllers: controllers,
  providers: services
})
export class AuthModule {}

export const authPrefix: RouteTree = {
  path: '/auth',
  module: AuthModule
};
