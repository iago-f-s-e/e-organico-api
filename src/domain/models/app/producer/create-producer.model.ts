import { CreateProducerDTO, ProducerPropDTO } from '@src/domain/dtos/producer';
import { ProducerMarketDTO } from '@src/domain/dtos/producer-market';
import { ProducerProductDTO } from '@src/domain/dtos/producer-product';
import { ValidateCertification } from '@src/domain/validators';
import { ToBeAssert } from '@src/domain/validators/on-error';
import { ValidateResponse } from '@src/types/responses';
import { CreateProducerMarketModel } from '../producer-market';
import { CreateProducerProductModel } from '../producer-product';
import { Assert, Errors, Set, Validated } from './create-producer.type';

export class CreateProducerModel {
  private readonly toCreate: CreateProducerDTO;
  protected certificationTypeOrError!: ValidateResponse<ValidateCertification>;

  constructor(
    producer: ProducerPropDTO,
    products: ProducerProductDTO[],
    markets: ProducerMarketDTO[]
  ) {
    this.set(producer);

    this.assert(this.certificationTypeOrError);

    const certificationType = this.certificationTypeOrError.value;
    const makeDelivery = producer.makeDelivery;
    const producerProducts = products.map(product => new CreateProducerProductModel(product).value);
    const producerMarkets = markets.map(market => new CreateProducerMarketModel(market).value);

    this.toCreate = this.afterValidate({
      certificationType,
      makeDelivery,
      producerProducts,
      producerMarkets
    });
  }

  private set(data: ProducerPropDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.certificationTypeOrError = ValidateCertification.exec(data.certificationType, {
      errorMessage: errorMessage.certificationType
    });
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: ProducerPropDTO): Errors {
    return {
      certificationType: `The certification type${data.certificationType}" is invalid`
    };
  }

  private afterValidate(validated: Validated): CreateProducerDTO {
    return {
      certificationType: validated.certificationType.value,
      makeDelivery: validated.makeDelivery,
      producerProducts: validated.producerProducts,
      producerMarkets: validated.producerMarkets
    };
  }

  public get value(): Readonly<CreateProducerDTO> {
    return Object.freeze(this.toCreate);
  }
}
