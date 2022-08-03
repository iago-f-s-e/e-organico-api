import { Module } from '@nestjs/common';
import { RedisService } from './services';

@Module({
  exports: [RedisService],
  providers: [RedisService]
})
export class RedisModule {}
