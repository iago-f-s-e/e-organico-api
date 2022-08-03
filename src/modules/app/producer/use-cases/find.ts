import { Injectable } from '@nestjs/common';
import { IFindProducerUseCase } from '@src/domain/interfaces';
import { Producer } from '@src/infra/database/entities';
import { ProducerRepository } from '@src/infra/database/repositories';
import { right } from '@src/shared/either';
import { FindResponse } from '@src/types/responses';

@Injectable()
export class FindProducerUseCase implements IFindProducerUseCase {
  constructor(private readonly repository: ProducerRepository) {}

  public async findById(id: string): FindResponse<Producer> {
    return right(await this.repository.findByIdOrError(id));
  }

  public exec(): Promise<Producer[]> {
    return this.repository.findAll();
  }
}
