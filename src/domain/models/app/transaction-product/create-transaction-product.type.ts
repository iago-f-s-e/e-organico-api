import { ValidateNumber, ValidateUUID } from '@src/domain/validators';
import { Right } from '@src/shared/either';
import { ValidateResponse } from '@src/types/responses';

export type Validated = {
  producerProductId: ValidateUUID;
  total: ValidateNumber;
  quantity: ValidateNumber;
};

export type Assert = {
  producerProductIdOrError: Right<null, ValidateUUID>;
  totalOrError: Right<null, ValidateNumber>;
  quantityOrError: Right<null, ValidateNumber>;
};

export type Set = {
  producerProductIdOrError: ValidateResponse<ValidateUUID>;
  totalOrError: ValidateResponse<ValidateNumber>;
  quantityOrError: ValidateResponse<ValidateNumber>;
};

export type Errors = {
  producerProductId: string;
  total: string;
  quantity: string;
};
