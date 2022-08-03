import { Module } from '@nestjs/common';
import { KafkaModule } from '../kafka';
import { ContainerController } from './controllers';
import { ContainerService } from './services';

@Module({
  imports: [KafkaModule],
  exports: [ContainerService],
  controllers: [ContainerController],
  providers: [ContainerService]
})
export class ContainerModule {}
