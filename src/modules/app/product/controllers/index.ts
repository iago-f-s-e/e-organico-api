import { Controller, Get } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { GetProduct, ProductToClient } from '@src/domain/dtos/product';
import { IProductController } from '@src/domain/interfaces';
import { productToClient } from '@src/domain/toClient';
import { RedisService } from '@src/infra/redis/services';
import { FindProductUseCase } from '../use-cases';

@Controller()
export class ProductController implements IProductController {
  private cacheKey = keys.PRODUCTS;

  constructor(
    private readonly findUseCase: FindProductUseCase,
    private readonly cache: RedisService
  ) {}

  private getCache(): Promise<ProductToClient[] | null> {
    return this.cache.get<ProductToClient[]>(this.cacheKey);
  }

  private async setCache(products: ProductToClient[]): Promise<void> {
    await this.cache.set(this.cacheKey, products);
  }

  @Get()
  public async getAll(): GetProduct {
    const cache = await this.getCache();

    if (cache) return cache;

    const products = (await this.findUseCase.exec()).map(product => productToClient(product));

    this.setCache(products);

    return products;
  }
}
