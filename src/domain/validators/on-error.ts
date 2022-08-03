import { ValidateResponse } from '@src/types/responses';

export type OnError = {
  errorMessage: string;
};

export type ToBeAssert = Array<ValidateResponse<unknown>>;
