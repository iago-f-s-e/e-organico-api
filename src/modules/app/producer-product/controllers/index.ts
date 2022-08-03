import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put
} from '@nestjs/common';
import { keys } from '@src/domain/constants';
import {
  GetProducerProduct,
  MinimalProducerProductToClient
} from '@src/domain/dtos/producer-product';
import { ProducerProductDTO } from '@src/domain/dtos/producer-product/producer-product.dto';
import { IProducerProductController } from '@src/domain/interfaces';
import { CreateProducerProductModel, UpdateProducerProductModel } from '@src/domain/models/app';
import {
  minimalProducerProductToClient,
  producerProductToClient
} from '@src/domain/toClient/producer-product';
import { ProducerProduct } from '@src/infra/database/entities';
import { RedisService } from '@src/infra/redis/services';
import { Current } from '@src/modules/common/guard';
import { CurrentUser } from '@src/types/global';
import * as UseCases from '../use-cases';

@Controller()
export class ProducerProductController implements IProducerProductController {
  private cacheKey = keys.PRODUCER_PRODUCTS;

  constructor(
    private readonly createUseCase: UseCases.CreateProducerProductUseCase,
    private readonly findUseCase: UseCases.FindProducerProductUseCase,
    private readonly updateUseCase: UseCases.UpdateProducerProductUseCase,
    private readonly cache: RedisService
  ) {}

  private async delCache(key: string): Promise<void> {
    await this.cache.del(key);
  }

  private getCache(key: string): Promise<MinimalProducerProductToClient[] | null> {
    return this.cache.get<MinimalProducerProductToClient[]>(key);
  }

  private async setCache(key: string, data: MinimalProducerProductToClient[]): Promise<void> {
    await this.cache.set(key, data);
  }

  @Post()
  public async create(@Body() body: ProducerProductDTO): Promise<ProducerProduct> {
    const producerProduct = new CreateProducerProductModel(body);

    const createOrError = await this.createUseCase.exec(producerProduct.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }

  @Get()
  public async getOwnProduct(@Current() current: CurrentUser): GetProducerProduct {
    const key = `producer:${current.id}@${this.cacheKey}`;

    const cache = await this.getCache(key);

    if (cache) return cache;

    const producerProducts = (await this.findUseCase.byProducerId(current.id)).map(
      producerProduct => minimalProducerProductToClient(producerProduct)
    );

    this.setCache(key, producerProducts);

    return producerProducts;
  }

  @Get(':id')
  public async getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): GetProducerProduct {
    const producerProduct = await this.findUseCase.byId(id);

    if (producerProduct.isLeft()) throw producerProduct.value;

    return producerProductToClient(producerProduct.value);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: ProducerProductDTO,
    @Current() current: CurrentUser
  ): Promise<void> {
    const producerProduct = new UpdateProducerProductModel(body);

    const key = `producer:${current.id}@${this.cacheKey}`;

    this.delCache(key);

    this.updateUseCase.exec(id, producerProduct.value);
  }

  @Patch(':id/inactive')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async inactive(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Current() current: CurrentUser
  ): Promise<void> {
    const key = `producer:${current.id}@${this.cacheKey}`;

    this.delCache(key);

    this.updateUseCase.inactive(id);
  }
}
