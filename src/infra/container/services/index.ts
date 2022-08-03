import { Injectable } from '@nestjs/common';
import { topics } from '@src/domain/constants';
import { KafkaService } from '@src/infra/kafka/service';
import { REPLICATION_ID } from '@src/server/settings';
import { updateContainer } from '../commands';
import { UpdateContainerReplicationMessage } from '../dtos/update-container-replication';

@Injectable()
export class ContainerService {
  constructor(private readonly kafkaService: KafkaService) {}

  private sendToReplication(message: UpdateContainerReplicationMessage): void {
    this.kafkaService.sendWithReplication(topics.UPDATE_CONTAINER_REPLICATION, message);
  }

  public async update(): Promise<void> {
    try {
      this.sendToReplication({ replicationId: REPLICATION_ID });

      const { stdout } = await updateContainer();

      console.log(`Update response: ${stdout}`);
    } catch (error) {
      console.error(error);
    }
  }

  public async updateReplication(replicationId: string): Promise<void> {
    try {
      if (replicationId === REPLICATION_ID) return;

      const { stdout } = await updateContainer();

      console.log(`Update response: ${stdout}`);
    } catch (error) {
      console.error(error);
    }
  }
}
