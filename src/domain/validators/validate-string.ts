import { BadRequestException } from '@nestjs/common';
import { left, right } from '@src/shared/either';
import { ValidateResponse } from '@src/types/responses';
import { OnError } from './on-error';

type Options = {
  isOptional: boolean;
  maxSize: number;
  minSize?: number;
};

export class ValidateString {
  private readonly data: Readonly<string>;

  private constructor(data: string) {
    this.data = data;
    Object.freeze(this);
  }

  public static exec(
    data: string,
    options: Options,
    onError: OnError
  ): ValidateResponse<ValidateString> {
    const withoutBlankSpace = data?.trim() || (null as unknown as string);

    if (!this.isValid(withoutBlankSpace, options))
      return left(new BadRequestException(onError.errorMessage));

    return right(new ValidateString(data));
  }

  private static isValid(data: string, options: Options): boolean {
    if (options.isOptional) return true;

    const minSize = options.minSize || 2;

    return !!data && !!data.length && data.length >= minSize && data.length <= options.maxSize;
  }

  public get value(): Readonly<string> {
    return this.data;
  }
}
