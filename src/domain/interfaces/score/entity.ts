import { IMarket } from '../market';
import { IProducerProduct } from '../producer-product';
import { IUser } from '../user';

export interface IScore {
  id: string;
  userId: string;
  marketId: string;
  producerProductId: string;
  transactions: number;
  rating: number;
  ratingQuantity: number;
  totalRating: number;
  user: IUser;
  market: IMarket;
  producerProduct: IProducerProduct;
}
