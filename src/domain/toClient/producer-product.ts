import { MinimalProducerProductToClient, ProducerProductToClient } from '../dtos/producer-product';
import { IProducerProduct } from '../interfaces';
import { unitMeasureToClient } from './unit-measure';

type ToClient = (producerProduct: IProducerProduct) => ProducerProductToClient;
type MinimalToClient = (producerProduct: IProducerProduct) => MinimalProducerProductToClient;

const defaultImage =
  'https://www.amigodoclima.com.br/wp-content/themes/amigodoclima/img/not-available.png';

export const minimalProducerProductToClient: MinimalToClient = producerProduct => ({
  id: producerProduct.id,
  image: defaultImage,
  name: producerProduct.product.name,
  price: producerProduct.price.toString(),
  stock: producerProduct.stock.toString(),
  unitMeasure: {
    name: producerProduct.unitMeasure.name
  }
});

export const producerProductToClient: ToClient = producerProduct => ({
  ...minimalProducerProductToClient(producerProduct),
  unitMeasure: unitMeasureToClient(producerProduct.unitMeasure),
  score: {
    transactions: producerProduct.score.transactions
  },
  stock: producerProduct.stock.toString(),
  harvestDate: new Intl.DateTimeFormat('pt-BR').format(new Date(producerProduct.harvestDate))
});
