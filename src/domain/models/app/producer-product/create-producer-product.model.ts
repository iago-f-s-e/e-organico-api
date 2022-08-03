import { CreateProducerProductDTO, ProducerProductDTO } from '@src/domain/dtos/producer-product';
import { IScore } from '@src/domain/interfaces';
import { ValidateNumber, ValidateUUID } from '@src/domain/validators';
import { ToBeAssert } from '@src/domain/validators/on-error';
import { ValidateResponse } from '@src/types/responses';
import { Set, Assert, Errors, Validated } from './create-producer-product.type';

export class CreateProducerProductModel {
  private readonly toUpdate: CreateProducerProductDTO;
  protected productIdOrError!: ValidateResponse<ValidateUUID>;
  protected unitMeasureIdOrError!: ValidateResponse<ValidateUUID>;
  protected priceOrError!: ValidateResponse<ValidateNumber>;
  protected stockOrError!: ValidateResponse<ValidateNumber>;

  constructor(data: ProducerProductDTO) {
    this.set(data);

    this.assert(
      this.productIdOrError,
      this.unitMeasureIdOrError,
      this.priceOrError,
      this.stockOrError
    );

    const productId = this.productIdOrError.value;
    const unitMeasureId = this.unitMeasureIdOrError.value;
    const price = this.priceOrError.value;
    const stock = this.stockOrError.value;
    const harvestDate = new Date(data.harvestDate);

    this.toUpdate = this.afterAssert({
      productId,
      unitMeasureId,
      price,
      stock,
      harvestDate
    });
  }

  private set(data: ProducerProductDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.productIdOrError = ValidateUUID.exec(data.product.id, {
      errorMessage: errorMessage.productId
    });

    this.unitMeasureIdOrError = ValidateUUID.exec(data.unitMeasure.id, {
      errorMessage: errorMessage.unitMeasureId
    });

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
      productId: `the product id ${data.product.id} is not available`,
      unitMeasureId: `the unit measure id ${data.unitMeasure.id} is not available`,
      price: `the price ${data.price} is not available`,
      stock: `the stock ${data.stock} is not available`
    };
  }

  private afterAssert(validated: Validated): CreateProducerProductDTO {
    return {
      productId: validated.productId.value,
      unitMeasureId: validated.unitMeasureId.value,
      price: validated.price.value,
      stock: validated.stock.value,
      harvestDate: validated.harvestDate,
      score: {} as unknown as IScore
    };
  }

  public get value(): Readonly<CreateProducerProductDTO> {
    return Object.freeze(this.toUpdate);
  }
}
