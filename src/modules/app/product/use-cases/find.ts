import { Injectable } from '@nestjs/common';
import { IFindProductUseCase } from '@src/domain/interfaces';
import { Product } from '@src/infra/database/entities';
import { ProductRepository } from '@src/infra/database/repositories';

@Injectable()
export class FindProductUseCase implements IFindProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  public exec(): Promise<Product[]> {
    return this.repository.findAll();
  }
}
