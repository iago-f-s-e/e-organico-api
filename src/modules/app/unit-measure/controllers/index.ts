import { Controller, Get } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { GetUnitMeasure, UnitMeasureToClient } from '@src/domain/dtos/unit-measure';
import { IUnitMeasureController } from '@src/domain/interfaces';
import { unitMeasureToClient } from '@src/domain/toClient';
import { RedisService } from '@src/infra/redis/services';
import { FindUnitMeasureUseCase } from '../use-cases';

@Controller()
export class UnitMeasureController implements IUnitMeasureController {
  private cacheKey = keys.UNIT_MEASURES;

  constructor(
    private readonly findUseCase: FindUnitMeasureUseCase,
    private readonly cache: RedisService
  ) {}

  private getCache(): Promise<UnitMeasureToClient[] | null> {
    return this.cache.get<UnitMeasureToClient[]>(this.cacheKey);
  }

  private async setCache(unitMeasures: UnitMeasureToClient[]): Promise<void> {
    await this.cache.set(this.cacheKey, unitMeasures);
  }

  @Get()
  public async getAll(): GetUnitMeasure {
    const cache = await this.getCache();

    if (cache) return cache;

    const unitMeasures = (await this.findUseCase.exec()).map(unitMeasure =>
      unitMeasureToClient(unitMeasure)
    );

    this.setCache(unitMeasures);

    return unitMeasures;
  }
}
