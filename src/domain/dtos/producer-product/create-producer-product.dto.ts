import { IScore } from '@src/domain/interfaces';

export type CreateProducerProductDTO = {
  productId: string;
  unitMeasureId: string;
  price: number;
  stock: number;
  harvestDate: Date;
  score: IScore;
};
