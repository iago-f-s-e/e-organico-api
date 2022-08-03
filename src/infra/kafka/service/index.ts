import { Inject, Injectable } from '@nestjs/common';
import { Producer, RecordMetadata } from '@nestjs/microservices/external/kafka.interface';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('KAFKA_PROVIDER') private readonly producer: Producer,
    @Inject('KAFKA_PROVIDER_REPLICATION') private readonly producerReplication: Producer
  ) {}

  public async send<T>(topic: string, data: T): Promise<RecordMetadata[]> {
    return this.producer.send({
      topic,
      messages: [
        {
          key: topic,
          value: JSON.stringify(data)
        }
      ]
    });
  }

  public async sendWithReplication<T>(topic: string, data: T): Promise<RecordMetadata[]> {
    return this.producerReplication.send({
      topic,
      messages: [
        {
          key: topic,
          value: JSON.stringify(data)
        }
      ]
    });
  }
}
