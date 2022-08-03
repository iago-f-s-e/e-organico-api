import { BadRequestException } from '@nestjs/common';
import { left, right } from '@src/shared/either';
import { certificationType, CertificationType } from '@src/types/entities';
import { ValidateResponse } from '@src/types/responses';
import { OnError } from './on-error';

export class ValidateCertification {
  private readonly data: CertificationType;

  private constructor(data: CertificationType) {
    this.data = data;
    Object.freeze(this);
  }
  public static exec(
    data: CertificationType,
    onError: OnError
  ): ValidateResponse<ValidateCertification> {
    if (!this.isValid(data)) return left(new BadRequestException(onError.errorMessage));

    return right(new ValidateCertification(data));
  }

  public get value(): CertificationType {
    return this.data;
  }

  private static isValid(data: CertificationType): boolean {
    return !!certificationType[data];
  }
}
