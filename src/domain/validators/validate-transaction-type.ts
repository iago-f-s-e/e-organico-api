import { BadRequestException } from '@nestjs/common';
import { left, right } from '@src/shared/either';
import { TransactionType, transactionType } from '@src/types/entities';
import { ValidateResponse } from '@src/types/responses';
import { OnError } from './on-error';

export class ValidateTransactionType {
  private readonly data: TransactionType;

  private constructor(data: TransactionType) {
    this.data = data;
    Object.freeze(this);
  }
  public static exec(
    data: TransactionType,
    onError: OnError
  ): ValidateResponse<ValidateTransactionType> {
    if (!this.isValid(data)) return left(new BadRequestException(onError.errorMessage));

    return right(new ValidateTransactionType(data));
  }

  public get value(): TransactionType {
    return this.data;
  }

  private static isValid(data: TransactionType): boolean {
    return !!transactionType[data];
  }
}
