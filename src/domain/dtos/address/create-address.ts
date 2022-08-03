import { StringOrNil } from '@src/types/global';

export type CreateAddressDTO = {
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
