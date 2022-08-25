import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProducerProductDTO,
  UpdateProducerProductDTO
} from '@src/domain/dtos/producer-product';
import { IProducerProductRepository } from '@src/domain/interfaces';
import { Repository, UpdateResult } from 'typeorm';
import { ProducerProduct } from '../entities';

@Injectable()
export class ProducerProductRepository implements IProducerProductRepository {
  constructor(
    @InjectRepository(ProducerProduct) private readonly producerProduct: Repository<ProducerProduct>
  ) {}

  public insert(
    data: Array<CreateProducerProductDTO & { producerId: string }>
  ): Promise<ProducerProduct[]> {
    return this.producerProduct.save(this.producerProduct.create(data));
  }

  public update(id: string, data: UpdateProducerProductDTO): Promise<UpdateResult> {
    return this.producerProduct.update({ id }, data);
  }

  public inactive(id: string): Promise<UpdateResult> {
    return this.producerProduct.update({ id }, { isActive: false });
  }

  public findByProducerId(producerId: string): Promise<ProducerProduct[]> {
    return this.producerProduct.find({
      where: { producerId, isActive: true },
      select: {
        id: true,
        price: true,
        stock: true,
        score: {
          transactions: true
        },
        product: {
          name: true
        }
      },
      relations: {
        product: true,
        score: true,
        unitMeasure: true
      }
    });
  }

  public async findOnlyProductIdsByProducerId(producerId: string): Promise<string[]> {
    return (
      await this.producerProduct.find({
        where: { producerId, isActive: true },
        select: { productId: true }
      })
    ).map(res => res.productId);
  }

  public async findByIdOrError(id: string): Promise<ProducerProduct> {
    const [producerProduct] = await this.producerProduct.find({
      where: {
        id,
        isActive: true
      },
      select: {
        id: true,
        harvestDate: true,
        price: true,
        stock: true,
        score: {
          transactions: true
        },
        product: {
          name: true
        }
      },
      relations: {
        product: true,
        score: true,
        unitMeasure: true
      }
    });

    if (!producerProduct) throw new NotFoundException('Product not found');

    return producerProduct;
  }
}
