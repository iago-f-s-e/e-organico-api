import {
  CreateTransactionProductDTO,
  TransactionProductDTO
} from '@src/domain/dtos/transaction-product';
import { ValidateNumber, ValidateUUID } from '@src/domain/validators';
import { ToBeAssert } from '@src/domain/validators/on-error';
import { ValidateResponse } from '@src/types/responses';
import { Set, Assert, Errors, Validated } from './create-transaction-product.type';

export class CreateTransactionProductModel {
  private readonly toUpdate: CreateTransactionProductDTO;
  protected producerProductIdOrError!: ValidateResponse<ValidateUUID>;
  protected totalOrError!: ValidateResponse<ValidateNumber>;
  protected quantityOrError!: ValidateResponse<ValidateNumber>;

  constructor(data: TransactionProductDTO) {
    this.set(data);

    this.assert(this.producerProductIdOrError, this.totalOrError, this.quantityOrError);

    const producerProductId = this.producerProductIdOrError.value;
    const total = this.totalOrError.value;
    const quantity = this.quantityOrError.value;

    this.toUpdate = this.afterAssert({ producerProductId, total, quantity });
  }

  private set(data: TransactionProductDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.producerProductIdOrError = ValidateUUID.exec(data.producerProduct.id, {
      errorMessage: errorMessage.producerProductId
    });

    this.totalOrError = ValidateNumber.exec(
      data.total,
      {
        isOptional: false
      },
      {
        errorMessage: errorMessage.total
      }
    );

    this.quantityOrError = ValidateNumber.exec(
      data.quantity,
      {
        isOptional: false
      },
      {
        errorMessage: errorMessage.quantity
      }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: TransactionProductDTO): Errors {
    return {
      producerProductId: `the product id ${data.producerProduct.id} is not available`,
      total: `the total ${data.total} is not available`,
      quantity: `the quantity ${data.quantity} is not available`
    };
  }

  private afterAssert(validated: Validated): CreateTransactionProductDTO {
    return {
      producerProductId: validated.producerProductId.value,
      total: validated.total.value,
      quantity: validated.quantity.value
    };
  }

  public get value(): Readonly<CreateTransactionProductDTO> {
    return Object.freeze(this.toUpdate);
  }
}
