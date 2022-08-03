import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import * as Settings from '@src/server/settings';

export const kafkaConnection: ClientProviderOptions = {
  name: 'KAFKA_CONNECTION',
  transport: Transport.KAFKA,
  options: {
    consumer: {
      groupId: Settings.SERVICE_ID
    },
    client: {
      clientId: Settings.KAFKA_CLIENT_ID,
      brokers: [Settings.KAFKA_BROKER]
    }
  }
};

export const kafkaConnectionReplication: ClientProviderOptions = {
  name: 'KAFKA_CONNECTION_REPLICATION',
  transport: Transport.KAFKA,
  options: {
    consumer: {
      groupId: Settings.REPLICATION_ID
    },
    client: {
      clientId: Settings.KAFKA_CLIENT_ID,
      brokers: [Settings.KAFKA_BROKER_REPLICATION]
    }
  }
};
