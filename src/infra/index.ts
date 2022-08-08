import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { HttpModule } from './http';
import { RedisModule } from './redis';
import { TokenModule } from './token';

@Module({
  imports: [DatabaseModule, RedisModule, HttpModule, TokenModule],
  exports: [DatabaseModule, RedisModule, HttpModule, TokenModule]
})
export class InfraModule {}
