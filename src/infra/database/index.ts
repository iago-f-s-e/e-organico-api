import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config';

import * as Entities from './entities';
import * as Repositories from './repositories';

const entities = Object.values(Entities);
const repositories = Object.values(Repositories);

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TypeOrmModule.forFeature(entities)],
  exports: repositories,
  providers: repositories
})
export class DatabaseModule {}
