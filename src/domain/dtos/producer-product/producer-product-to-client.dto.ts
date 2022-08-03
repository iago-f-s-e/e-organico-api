import { UnitMeasureToClient } from '../unit-measure';

export type MinimalProducerProductToClient = {
  id: string;
  image: string;
  name: string;
  price: string;
  stock: string;
  unitMeasure: {
    name: string;
  };
};

export type ProducerProductToClient = MinimalProducerProductToClient & {
  unitMeasure: UnitMeasureToClient;
  harvestDate: string;
  score: {
    transactions: number;
  };
};
