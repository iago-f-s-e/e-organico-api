import { BadRequestException } from '@nestjs/common';
import { isValidDocument } from './helpers';
import { left, right } from '@src/shared/either';
import { ValidateResponse } from '@src/types/responses';
import { OnError } from './on-error';

export class ValidateDocument {
  private readonly data: Readonly<string>;

  private constructor(data: string) {
    this.data = data;
    Object.freeze(this);
  }

  public static exec(data: string, onError: OnError): ValidateResponse<ValidateDocument> {
    if (!this.isValid(data)) return left(new BadRequestException(onError.errorMessage));

    return right(new ValidateDocument(data));
  }

  private static isValid(data: string): boolean {
    return !!data && isValidDocument(data);
  }

  public get value(): Readonly<string> {
    return this.data;
  }
}
