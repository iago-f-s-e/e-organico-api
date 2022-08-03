import { ProductToClient } from './product-to-client.dto';

export type GetProduct = Promise<ProductToClient | ProductToClient[]>;
