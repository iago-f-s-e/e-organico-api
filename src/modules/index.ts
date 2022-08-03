import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { InfraModule } from '@src/infra';
import { AppModule, appPrefix } from './app';
import { AuthModule, authPrefix } from './auth';
import { CommonModule } from './common';

@Module({
  imports: [
    InfraModule,
    AppModule,
    AuthModule,
    CommonModule,
    RouterModule.register([appPrefix, authPrefix])
  ]
})
export class Modules {}
