import { StringOrNil } from '@src/types/global';

export type AddressToClient = {
  id: string;
  state: string;
  city: string;
  district: string;
  street: StringOrNil;
  zipCode: StringOrNil;
  number: string | 's/n';
  complement: StringOrNil;
  lat: StringOrNil;
  long: StringOrNil;
};
