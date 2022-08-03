import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { topics } from '@src/domain/constants';
import { MessagePayload } from '@src/types/global';
import { UpdateContainerReplicationMessage } from '../dtos/update-container-replication';
import { ContainerService } from '../services';
@Controller()
export class ContainerController {
  constructor(private readonly service: ContainerService) {}

  @MessagePattern(topics.UPDATE_CONTAINER_REPLICATION)
  public updateReplication(
    @Payload() message: MessagePayload<UpdateContainerReplicationMessage>
  ): void {
    console.log('atualizando replicação do container');

    const { value } = message;

    this.service.updateReplication(value.replicationId);
  }

  @MessagePattern(topics.UPDATE_CONTAINER)
  public update(): void {
    console.log('atualizando container');

    this.service.update();
  }

  @Get('ping')
  public containerStatus(): string {
    return 'OK';
  }
}
