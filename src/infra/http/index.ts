import { Module } from '@nestjs/common';
import { HttpService } from './services';

@Module({
  exports: [HttpService],
  providers: [HttpService]
})
export class HttpModule {}
