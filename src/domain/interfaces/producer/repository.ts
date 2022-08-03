import { IProducer } from './entity';

export interface IProducerRepository {
  findAll(): Promise<IProducer[]>;
  findByIdOrError(id: string): Promise<IProducer>;
}
