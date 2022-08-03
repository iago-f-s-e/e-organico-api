import { CreateTransactionDTO, TransactionDTO } from '@src/domain/dtos/transaction';
import { ValidateNumber, ValidateTransactionType } from '@src/domain/validators';
import { ToBeAssert } from '@src/domain/validators/on-error';
import { ValidateResponse } from '@src/types/responses';
import { CreateTransactionProductModel } from '../transaction-product';
import { Assert, Errors, Set, Validated } from './create-transaction.type';

export class CreateTransactionModel {
  private readonly toCreate: CreateTransactionDTO;
  protected totalOrError!: ValidateResponse<ValidateNumber>;
  protected productQuantityOrError!: ValidateResponse<ValidateNumber>;
  protected typeOrError!: ValidateResponse<ValidateTransactionType>;

  constructor(data: TransactionDTO) {
    this.set(data);

    this.assert(this.totalOrError, this.productQuantityOrError, this.typeOrError);

    const consumerId = data.consumer.id;
    const producerId = data.producer.id;
    const paymentId = data.payment.id;
    const selectedDayId = data.information.selectedDay?.id;
    const marketId = data.information.market?.id;
    const addressId = data.information.address?.id;
    const total = this.totalOrError.value;
    const productQuantity = this.productQuantityOrError.value;
    const type = this.typeOrError.value;
    const transactionProducts = data.products.map(
      product => new CreateTransactionProductModel(product).value
    );
    this.toCreate = this.afterValidate({
      consumerId,
      producerId,
      paymentId,
      selectedDayId,
      marketId,
      addressId,
      total,
      productQuantity,
      type,
      transactionProducts
    });
  }

  private set(data: TransactionDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.totalOrError = ValidateNumber.exec(
      data.total,
      { isOptional: false },
      {
        errorMessage: errorMessage.total
      }
    );

    this.productQuantityOrError = ValidateNumber.exec(
      data.productQuantity,
      { isOptional: false },
      {
        errorMessage: errorMessage.productQuantity
      }
    );

    this.typeOrError = ValidateTransactionType.exec(data.information.type, {
      errorMessage: errorMessage.type
    });
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) {
        throw errorInstance.value;
      }
    }
  }

  private getErrorMessage(data: TransactionDTO): Errors {
    return {
      type: `the type ${data.information.type} is not available`,
      total: `the total ${data.total} is not available`,
      productQuantity: `the product quantity ${data.productQuantity} is not available`
    };
  }

  private afterValidate(validated: Validated): CreateTransactionDTO {
    return {
      addressId: validated.addressId,
      consumerId: validated.consumerId,
      marketId: validated.marketId,
      paymentId: validated.paymentId,
      producerId: validated.producerId,
      selectedDayId: validated.selectedDayId,
      transactionProducts: validated.transactionProducts,
      total: validated.total.value,
      type: validated.type.value,
      productQuantity: validated.productQuantity.value
    };
  }

  public get value(): Readonly<CreateTransactionDTO> {
    return Object.freeze(this.toCreate);
  }
}
