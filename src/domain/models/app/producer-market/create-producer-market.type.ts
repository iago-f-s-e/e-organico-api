import { ValidateUUID } from '@src/domain/validators';
import { Right } from '@src/shared/either';
import { ValidateResponse } from '@src/types/responses';

export type Validated = {
  marketId: ValidateUUID;
};

export type Assert = {
  marketIdOrError: Right<null, ValidateUUID>;
};

export type Set = {
  marketIdOrError: ValidateResponse<ValidateUUID>;
};

export type Errors = {
  marketId: string;
};
