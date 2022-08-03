import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductRepository } from '@src/domain/interfaces';
import { Repository } from 'typeorm';
import { Product } from '../entities';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(@InjectRepository(Product) private readonly product: Repository<Product>) {}

  public async findAll(): Promise<Product[]> {
    return this.product.find({
      where: { isActive: true },
      order: {
        name: 'ASC',
        type: 'ASC'
      },
      select: {
        id: true,
        name: true,
        type: true
      }
    });
  }
}
