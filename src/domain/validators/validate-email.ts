import { BadRequestException } from '@nestjs/common';
import { isValidEmail } from './helpers';
import { left, right } from '@src/shared/either';
import { ValidateResponse } from '@src/types/responses';
import { OnError } from './on-error';

type Options = {
  maxSize: number;
};

export class ValidateEmail {
  private readonly data: Readonly<string>;

  private constructor(data: string) {
    this.data = data;
    Object.freeze(this);
  }

  public static exec(
    data: string,
    options: Options,
    onError: OnError
  ): ValidateResponse<ValidateEmail> {
    if (!this.isValid(data, options.maxSize))
      return left(new BadRequestException(onError.errorMessage));

    return right(new ValidateEmail(data));
  }

  private static isValid(data: string, maxSize: number): boolean {
    return !!data && isValidEmail(data, maxSize);
  }

  public get value(): Readonly<string> {
    return this.data;
  }
}
