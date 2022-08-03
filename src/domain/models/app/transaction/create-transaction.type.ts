import { CreateTransactionProductDTO } from '@src/domain/dtos/transaction-product';
import { ValidateNumber, ValidateTransactionType } from '@src/domain/validators';
import { Right } from '@src/shared/either';
import { Nil } from '@src/types/global';
import { ValidateResponse } from '@src/types/responses';

export type Validated = {
  consumerId: string;
  producerId: string;
  paymentId: string;
  selectedDayId: string | Nil;
  marketId: string | Nil;
  addressId: string | Nil;
  total: ValidateNumber;
  productQuantity: ValidateNumber;
  type: ValidateTransactionType;
  transactionProducts: CreateTransactionProductDTO[];
};

export type Assert = {
  totalOrError: Right<null, ValidateNumber>;
  productQuantityOrError: Right<null, ValidateNumber>;
  typeOrError: Right<null, ValidateTransactionType>;
};

export type Set = {
  totalOrError: ValidateResponse<ValidateNumber>;
  productQuantityOrError: ValidateResponse<ValidateNumber>;
  typeOrError: ValidateResponse<ValidateTransactionType>;
};

export type Errors = {
  total: string;
  productQuantity: string;
  type: string;
};
