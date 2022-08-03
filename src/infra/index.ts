import { Module } from '@nestjs/common';
import { ContainerModule } from './container';
import { DatabaseModule } from './database';
import { HttpModule } from './http';
import { KafkaModule } from './kafka';
import { RedisModule } from './redis';
import { TokenModule } from './token';

@Module({
  imports: [DatabaseModule, KafkaModule, RedisModule, HttpModule, ContainerModule, TokenModule],
  exports: [DatabaseModule, KafkaModule, RedisModule, HttpModule, ContainerModule, TokenModule]
})
export class InfraModule {}
