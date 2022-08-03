import { maxSize, minSize } from '@src/domain/constants';
import { CreateUserDTO, UserDTO } from '@src/domain/dtos/user';
import { IScore } from '@src/domain/interfaces';
import { ValidateDocument, ValidateEmail, ValidateString } from '@src/domain/validators';
import { ToBeAssert } from '@src/domain/validators/on-error';
import { ValidateResponse } from '@src/types/responses';
import { ValidateToCreateAddress } from '../address';
import { CreateProducerModel } from '../app/producer';

import { Assert, Errors, Set, Validated } from './create-user.type';

export class CreateUserModel {
  private readonly toCreate: CreateUserDTO;
  protected nameOrError!: ValidateResponse<ValidateString>;
  protected phoneOrError!: ValidateResponse<ValidateString>;
  protected emailOrError!: ValidateResponse<ValidateEmail>;
  protected passwordOrError!: ValidateResponse<ValidateString>;
  protected documentOrError!: ValidateResponse<ValidateDocument>;

  constructor(data: UserDTO) {
    this.set(data);

    this.assert(
      this.nameOrError,
      this.phoneOrError,
      this.emailOrError,
      this.passwordOrError,
      this.documentOrError
    );

    const name = this.nameOrError.value;
    const phone = this.phoneOrError.value;
    const email = this.emailOrError.value;
    const password = this.passwordOrError.value;
    const document = this.documentOrError.value;
    const address = [new ValidateToCreateAddress(data.address).value];
    const producer =
      data.type === 'producer'
        ? new CreateProducerModel(data.producer, data.products, data.markets).value
        : undefined;

    this.toCreate = this.afterValidate({
      name,
      phone,
      email,
      password,
      document,
      address,
      producer
    });
  }

  private set(data: UserDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.nameOrError = ValidateString.exec(
      data.name,
      { isOptional: false, maxSize: maxSize.USER_NAME },
      { errorMessage: errorMessage.name }
    );

    this.phoneOrError = ValidateString.exec(
      data.phone,
      { isOptional: false, maxSize: maxSize.USER_PHONE },
      { errorMessage: errorMessage.phone }
    );

    this.emailOrError = ValidateEmail.exec(
      data.email,
      { maxSize: maxSize.USER_EMAIL },
      { errorMessage: errorMessage.email }
    );

    this.passwordOrError = ValidateString.exec(
      data.password,
      { isOptional: false, maxSize: maxSize.USER_PASSWORD, minSize: minSize.USER_PASSWORD },
      { errorMessage: errorMessage.password }
    );

    this.documentOrError = ValidateDocument.exec(data.document, {
      errorMessage: errorMessage.document
    });
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: UserDTO): Errors {
    return {
      name: `The name "${data.name}" is invalid`,
      phone: `The phone "${data.phone}" is invalid`,
      email: `The email "${data.email}" is invalid`,
      password: `The password "${data.password}" is invalid`,
      document: `The cpf "${data.document}" is invalid`
    };
  }

  private afterValidate(validated: Validated): CreateUserDTO {
    return {
      name: validated.name.value.toUpperCase(),
      phone: validated.phone.value,
      email: validated.email.value.toLowerCase(),
      password: validated.password.value,
      document: validated.document.value,
      address: validated.address,
      producer: validated.producer,
      score: {} as unknown as IScore
    };
  }

  public get value(): Readonly<CreateUserDTO> {
    return Object.freeze(this.toCreate);
  }
}
