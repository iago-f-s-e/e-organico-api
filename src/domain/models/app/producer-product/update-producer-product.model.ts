import { UpdateProducerProductDTO, ProducerProductDTO } from '@src/domain/dtos/producer-product';
import { ValidateNumber } from '@src/domain/validators';
import { ToBeAssert } from '@src/domain/validators/on-error';
import { ValidateResponse } from '@src/types/responses';
import { Set, Assert, Errors, Validated } from './update-producer-product.type';

export class UpdateProducerProductModel {
  private readonly toUpdate: UpdateProducerProductDTO;
  protected priceOrError!: ValidateResponse<ValidateNumber>;
  protected stockOrError!: ValidateResponse<ValidateNumber>;

  constructor(data: ProducerProductDTO) {
    this.set(data);

    this.assert(this.priceOrError, this.stockOrError);

    const price = this.priceOrError.value;
    const stock = this.stockOrError.value;
    const harvestDate = new Date(data.harvestDate);

    this.toUpdate = this.afterAssert({
      price,
      stock,
      harvestDate
    });
  }

  private set(data: ProducerProductDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.priceOrError = ValidateNumber.exec(
      data.price,
      {
        isOptional: false
      },
      {
        errorMessage: errorMessage.price
      }
    );

    this.stockOrError = ValidateNumber.exec(
      data.stock,
      {
        isOptional: false
      },
      {
        errorMessage: errorMessage.stock
      }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: ProducerProductDTO): Errors {
    return {
      price: `the price ${data.price} is not available`,
      stock: `the stock ${data.stock} is not available`
    };
  }

  private afterAssert(validated: Validated): UpdateProducerProductDTO {
    return {
      price: validated.price.value,
      stock: validated.stock.value,
      harvestDate: validated.harvestDate
    };
  }

  public get value(): Readonly<UpdateProducerProductDTO> {
    return Object.freeze(this.toUpdate);
  }
}
