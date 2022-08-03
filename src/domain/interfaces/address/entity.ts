import { StringOrNil } from '@src/types/global';
import { IMarket } from '../market';
import { IProperty } from '../property';
import { ITransaction } from '../transaction';
import { IUser } from '../user';

export interface IAddress {
  id: string;
  userId: string;
  marketId: string;
  propertyId: string;
  state: string;
  city: string;
  district: string;
  street: StringOrNil;
  zipCode: StringOrNil;
  complement: StringOrNil;
  lat: StringOrNil;
  long: StringOrNil;
  number: StringOrNil;
  user: IUser;
  market: IMarket;
  transactions: ITransaction[];
  property: IProperty;
}
