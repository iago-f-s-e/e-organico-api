import { FindResponse } from '@src/types/responses';
import { IProducer } from './entity';

export interface IFindProducerUseCase {
  findById(id: string): FindResponse<IProducer>;
  exec(): Promise<IProducer[]>;
}
