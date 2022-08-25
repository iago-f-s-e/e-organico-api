import { Injectable } from '@nestjs/common';
import { IFindProductUseCase } from '@src/domain/interfaces';
import { Product } from '@src/infra/database/entities';
import { ProductRepository } from '@src/infra/database/repositories';
import { FindProducerProductUseCase } from '../../producer-product/use-cases';

@Injectable()
export class FindProductUseCase implements IFindProductUseCase {
  constructor(
    private readonly repository: ProductRepository,
    private readonly findProductProduct: FindProducerProductUseCase
  ) {}

  public async withoutProducerProduct(producerId: string): Promise<Product[]> {
    const notInIds = await this.findProductProduct.onlyProductIdByProducerId(producerId);

    return this.repository.findWithoutProducerProduct(notInIds);
  }

  public exec(): Promise<Product[]> {
    return this.repository.findAll();
  }
}
