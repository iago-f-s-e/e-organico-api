import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { InfraModule } from '@src/infra';
import { AppModule, appPrefix } from './app';
import { AuthModule, authPrefix } from './auth';
import { CommonModule } from './common';

@Module({
  imports: [
    AuthModule,
    AppModule,
    InfraModule,
    CommonModule,
    RouterModule.register([authPrefix, appPrefix])
  ]
})
export class Modules {}
