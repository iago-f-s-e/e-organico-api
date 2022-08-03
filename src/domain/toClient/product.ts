import { capitalize } from '@src/shared/functions';
import { ProductToClient } from '../dtos/product';
import { IProduct } from '../interfaces';

type ToClient = (product: IProduct) => ProductToClient;

const defaultImage =
  'https://www.amigodoclima.com.br/wp-content/themes/amigodoclima/img/not-available.png';

export const productToClient: ToClient = product => ({
  id: product.id,
  name: capitalize(product.name),
  type: capitalize(product.type),
  image: defaultImage
});
