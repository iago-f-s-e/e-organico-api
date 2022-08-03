import { Provider } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

export const provider: Provider = {
  provide: 'KAFKA_PROVIDER',
  useFactory: async (client: ClientKafka) => client.connect(),
  inject: ['KAFKA_CONNECTION']
};

export const providerReplication: Provider = {
  provide: 'KAFKA_PROVIDER_REPLICATION',
  useFactory: async (client: ClientKafka) => client.connect(),
  inject: ['KAFKA_CONNECTION_REPLICATION']
};
