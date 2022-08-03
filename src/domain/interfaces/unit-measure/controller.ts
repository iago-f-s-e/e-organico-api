import { GetUnitMeasure } from '@src/domain/dtos/unit-measure';

export interface IUnitMeasureController {
  getAll(): GetUnitMeasure;
}
