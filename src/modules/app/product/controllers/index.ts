import { Controller, Get } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { GetProduct, ProductToClient } from '@src/domain/dtos/product';
import { IProductController } from '@src/domain/interfaces';
import { productToClient } from '@src/domain/toClient';
import { RedisService } from '@src/infra/redis/services';
import { Current } from '@src/modules/common/guard';
import { CurrentUser } from '@src/types/global';
import { FindProductUseCase } from '../use-cases';

@Controller()
export class ProductController implements IProductController {
  private cacheKey = keys.PRODUCTS;
  private cacheKeyWithoutProducerProduct = keys.PRODUCTS_WITHOUT_PRODUCER_PRODUCT;

  constructor(
    private readonly findUseCase: FindProductUseCase,
    private readonly cache: RedisService
  ) {}

  private getCache(key?: string): Promise<ProductToClient[] | null> {
    return this.cache.get<ProductToClient[]>(key || this.cacheKey);
  }

  private async setCache(products: ProductToClient[], key?: string): Promise<void> {
    await this.cache.set(key || this.cacheKey, products);
  }

  @Get()
  public async getAll(): GetProduct {
    console.log('aqui');

    const cache = await this.getCache();

    if (cache) return cache;

    const products = (await this.findUseCase.exec()).map(product => productToClient(product));

    this.setCache(products);

    return products;
  }

  @Get('without-producer-product')
  public async getWithoutProducerProduct(@Current() current: CurrentUser): GetProduct {
    const key = `${this.cacheKeyWithoutProducerProduct}${current.id}`;

    const cache = await this.getCache(key);

    if (cache) return cache;

    const products = (await this.findUseCase.withoutProducerProduct(current.id)).map(product =>
      productToClient(product)
    );

    this.setCache(products, key);

    return products;
  }
}
