import { Module } from '@nestjs/common';

import * as S from './services';

const services = [...Object.values(S)];

@Module({
  exports: services,
  providers: services
})
export class CommonModule {}
