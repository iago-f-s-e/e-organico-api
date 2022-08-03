import { CreateProducerMarketDTO, ProducerMarketDTO } from '@src/domain/dtos/producer-market';
import { ValidateUUID } from '@src/domain/validators';
import { ToBeAssert } from '@src/domain/validators/on-error';
import { ValidateResponse } from '@src/types/responses';
import { Set, Assert, Errors, Validated } from './create-producer-market.type';

export class CreateProducerMarketModel {
  private readonly toUpdate: CreateProducerMarketDTO;
  protected marketIdOrError!: ValidateResponse<ValidateUUID>;

  constructor(data: ProducerMarketDTO) {
    this.set(data);

    this.assert(this.marketIdOrError);

    const marketId = this.marketIdOrError.value;

    this.toUpdate = this.afterAssert({ marketId });
  }

  private set(data: ProducerMarketDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.marketIdOrError = ValidateUUID.exec(data.id, {
      errorMessage: errorMessage.marketId
    });
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: ProducerMarketDTO): Errors {
    return {
      marketId: `the market id ${data.id} is not available`
    };
  }

  private afterAssert(validated: Validated): CreateProducerMarketDTO {
    return {
      marketId: validated.marketId.value
    };
  }

  public get value(): Readonly<CreateProducerMarketDTO> {
    return Object.freeze(this.toUpdate);
  }
}
