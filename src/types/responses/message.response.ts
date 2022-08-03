import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

export type MessageResponse<T> = Omit<KafkaMessage, 'value'> & { value: T };
