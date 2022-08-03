import { Module } from '@nestjs/common';
import { InfraModule } from '@src/infra';
import { CommonModule } from '@src/modules/common';

import * as UseCases from './useCases';

const useCases = Object.values(UseCases);

@Module({
  imports: [InfraModule, CommonModule],
  exports: useCases,
  providers: useCases
})
export class UserModule {}
