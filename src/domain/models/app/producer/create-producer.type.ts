import { CreateProducerMarketDTO } from '@src/domain/dtos/producer-market';
import { CreateProducerProductDTO } from '@src/domain/dtos/producer-product';
import { ValidateCertification } from '@src/domain/validators';
import { Right } from '@src/shared/either';
import { ValidateResponse } from '@src/types/responses';

export type Validated = {
  certificationType: ValidateCertification;
  makeDelivery: boolean;
  producerProducts: CreateProducerProductDTO[];
  producerMarkets: CreateProducerMarketDTO[];
};

export type Assert = {
  certificationTypeOrError: Right<null, ValidateCertification>;
};

export type Set = {
  certificationTypeOrError: ValidateResponse<ValidateCertification>;
};

export type Errors = {
  certificationType: string;
};
