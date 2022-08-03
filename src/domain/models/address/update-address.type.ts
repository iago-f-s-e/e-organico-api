import { ValidateString, ValidateZipCode } from '@src/domain/validators';
import { Right } from '@src/shared/either';
import { StringOrNil } from '@src/types/global';
import { ValidateResponse } from '@src/types/responses';

export type Validated = {
  id: string;
  userId: string;
  state: ValidateString;
  city: ValidateString;
  district: ValidateString;
  street: ValidateString;
  zipCode: ValidateZipCode;
  number: string;
  lat: StringOrNil;
  long: StringOrNil;
  complement: ValidateString;
};

export type Assert = {
  stateOrError: Right<null, ValidateString>;
  cityOrError: Right<null, ValidateString>;
  districtOrError: Right<null, ValidateString>;
  streetOrError: Right<null, ValidateString>;
  zipCodeOrError: Right<null, ValidateZipCode>;
  complementOrError: Right<null, ValidateString>;
};

export type Set = {
  stateOrError: ValidateResponse<ValidateString>;
  cityOrError: ValidateResponse<ValidateString>;
  districtOrError: ValidateResponse<ValidateString>;
  streetOrError: ValidateResponse<ValidateString>;
  zipCodeOrError: ValidateResponse<ValidateZipCode>;
  complementOrError: ValidateResponse<ValidateString>;
};

export type Errors = {
  state: string;
  city: string;
  district: string;
  street: string;
  zipCode: string;
  number: string;
  complement: string;
};
