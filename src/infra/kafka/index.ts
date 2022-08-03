import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
  kafkaConnection,
  kafkaConnectionReplication,
  provider,
  providerReplication
} from './config';
import { KafkaService } from './service';

@Module({
  imports: [ClientsModule.register([kafkaConnection, kafkaConnectionReplication])],
  providers: [provider, providerReplication, KafkaService],
  exports: [KafkaService]
})
export class KafkaModule {}
