import { ValidateNumber } from '@src/domain/validators';
import { Right } from '@src/shared/either';
import { ValidateResponse } from '@src/types/responses';

export type Validated = {
  price: ValidateNumber;
  stock: ValidateNumber;
  harvestDate: Date;
};

export type Assert = {
  priceOrError: Right<null, ValidateNumber>;
  stockOrError: Right<null, ValidateNumber>;
};

export type Set = {
  priceOrError: ValidateResponse<ValidateNumber>;
  stockOrError: ValidateResponse<ValidateNumber>;
};

export type Errors = {
  price: string;
  stock: string;
};
