import { Module } from '@nestjs/common';
import { configConfig } from './config';

import { TokenService } from './service';

@Module({
  imports: [configConfig],
  exports: [TokenService],
  providers: [TokenService]
})
export class TokenModule {}
