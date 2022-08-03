import { Injectable } from '@nestjs/common';
import { IFindProducerProductUseCase } from '@src/domain/interfaces';
import { ProducerProduct } from '@src/infra/database/entities';
import { ProducerProductRepository } from '@src/infra/database/repositories';
import { right } from '@src/shared/either';
import { FindResponse } from '@src/types/responses';

@Injectable()
export class FindProducerProductUseCase implements IFindProducerProductUseCase {
  constructor(private readonly repository: ProducerProductRepository) {}

  public async byId(id: string): FindResponse<ProducerProduct> {
    return right(await this.repository.findByIdOrError(id));
  }

  public byProducerId(id: string): Promise<ProducerProduct[]> {
    return this.repository.findByProducerId(id);
  }
}
