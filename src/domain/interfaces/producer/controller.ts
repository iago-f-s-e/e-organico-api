import { GetProducer } from '@src/domain/dtos/producer';

export interface IProducerController {
  getById(id: string): GetProducer;
  getAllProducers(): GetProducer;
}
