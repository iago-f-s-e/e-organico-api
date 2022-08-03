import { Injectable } from '@nestjs/common';
import { CreateProducerProductDTO } from '@src/domain/dtos/producer-product';
import { ICreateProducerProductUseCase } from '@src/domain/interfaces';
import { ProducerProduct } from '@src/infra/database/entities';
import { ProducerProductRepository } from '@src/infra/database/repositories';
import { right } from '@src/shared/either';
import { CreateResponse } from '@src/types/responses';

@Injectable()
export class CreateProducerProductUseCase implements ICreateProducerProductUseCase {
  constructor(private readonly repository: ProducerProductRepository) {}

  public async exec(data: CreateProducerProductDTO): CreateResponse<ProducerProduct> {
    return right(await this.repository.insert(data));
  }
}
