import { IUnitMeasure } from './entity';

export interface IFindUnitMeasureUseCase {
  exec(): Promise<IUnitMeasure[]>;
}
