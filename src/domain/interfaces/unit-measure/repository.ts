import { IUnitMeasure } from './entity';

export interface IUnitMeasureRepository {
  findAll(): Promise<IUnitMeasure[]>;
}
