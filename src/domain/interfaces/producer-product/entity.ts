import { IProducer } from '../producer';
import { IProduct } from '../product';
import { IScore } from '../score';
import { ITransactionProduct } from '../transaction-product';
import { IUnitMeasure } from '../unit-measure/entity';

export interface IProducerProduct {
  id: string;
  productId: string;
  producerId: string;
  unitMeasureId: string;
  price: number;
  stock: number;
  harvestDate: Date;
  isActive: boolean;
  unitMeasure: IUnitMeasure;
  product: IProduct;
  producer: IProducer;
  score: IScore;
  transactionProducts: ITransactionProduct[];
}
