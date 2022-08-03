import { BadRequestException } from '@nestjs/common';
import { left, right } from '@src/shared/either';
import { ValidateResponse } from '@src/types/responses';
import { OnError } from './on-error';

type Options = {
  isOptional: boolean;
};

export class ValidateNumber {
  private readonly data: Readonly<number>;

  private constructor(data: number) {
    this.data = data;
    Object.freeze(this);
  }

  public static exec(
    data: string,
    options: Options,
    onError: OnError
  ): ValidateResponse<ValidateNumber> {
    const number = this.getNumber(data, options.isOptional);

    if (!this.isValid(number, options)) return left(new BadRequestException(onError.errorMessage));

    return right(new ValidateNumber(number));
  }

  private static getNumber(data: string, isOptional: boolean): number {
    const number = (data || null) as unknown as number;

    if (isOptional) return number;

    return Number(number);
  }

  private static isValid(data: number, options: Options): boolean {
    return options.isOptional || !Number.isNaN(data);
  }

  public get value(): Readonly<number> {
    return this.data;
  }
}
