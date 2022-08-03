import { Injectable } from '@nestjs/common';
import { UpdateProducerProductDTO } from '@src/domain/dtos/producer-product';
import { IUpdateProducerProductUseCase } from '@src/domain/interfaces';
import { ProducerProductRepository } from '@src/infra/database/repositories';

@Injectable()
export class UpdateProducerProductUseCase implements IUpdateProducerProductUseCase {
  constructor(private readonly repository: ProducerProductRepository) {}

  public async inactive(id: string): Promise<void> {
    await this.repository.inactive(id);
  }

  public async exec(id: string, data: UpdateProducerProductDTO): Promise<void> {
    await this.repository.update(id, data);
  }
}
