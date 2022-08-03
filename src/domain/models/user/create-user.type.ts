import { CreateAddressDTO } from '@src/domain/dtos/address';
import { CreateProducerDTO } from '@src/domain/dtos/producer';
import { ValidateDocument, ValidateEmail, ValidateString } from '@src/domain/validators';
import { Right } from '@src/shared/either';
import { ValidateResponse } from '@src/types/responses';

export type Validated = {
  name: ValidateString;
  phone: ValidateString;
  email: ValidateEmail;
  password: ValidateString;
  document: ValidateDocument;
  address: CreateAddressDTO[];
  producer?: CreateProducerDTO;
};

export type Assert = {
  nameOrError: Right<null, ValidateString>;
  phoneOrError: Right<null, ValidateString>;
  emailOrError: Right<null, ValidateEmail>;
  passwordOrError: Right<null, ValidateString>;
  documentOrError: Right<null, ValidateDocument>;
};

export type Set = {
  nameOrError: ValidateResponse<ValidateString>;
  phoneOrError: ValidateResponse<ValidateString>;
  emailOrError: ValidateResponse<ValidateEmail>;
  passwordOrError: ValidateResponse<ValidateString>;
  documentOrError: ValidateResponse<ValidateDocument>;
};

export type Errors = {
  name: string;
  phone: string;
  email: string;
  document: string;
  password: string;
};
