import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

export type MessagePayload<T> = Omit<KafkaMessage, 'value'> & { value: T };
