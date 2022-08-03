import { StringOrNil } from '@src/types/global';

export type AddressDTO = {
  id: string;
  state: string;
  city: string;
  district: string;
  street: string;
  zipCode: string;
  number: StringOrNil;
  complement: string;
  lat: StringOrNil;
  long: StringOrNil;
};
