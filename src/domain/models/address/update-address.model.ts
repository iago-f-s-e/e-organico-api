import { maxSize, minSize } from '@src/domain/constants';
import { AddressDTO, UpdateAddressDTO } from '@src/domain/dtos/address';
import { ValidateString, ValidateZipCode } from '@src/domain/validators';
import { ToBeAssert } from '@src/domain/validators/on-error';
import { ValidateResponse } from '@src/types/responses';

import { Assert, Errors, Set, Validated } from './update-address.type';

export class ValidateToUpdateAddress {
  private readonly toUpdate: UpdateAddressDTO;
  protected stateOrError!: ValidateResponse<ValidateString>;
  protected cityOrError!: ValidateResponse<ValidateString>;
  protected districtOrError!: ValidateResponse<ValidateString>;
  protected streetOrError!: ValidateResponse<ValidateString>;
  protected zipCodeOrError!: ValidateResponse<ValidateZipCode>;
  protected complementOrError!: ValidateResponse<ValidateString>;

  constructor(data: AddressDTO & { userId: string }) {
    this.set(data);

    this.assert(
      this.stateOrError,
      this.cityOrError,
      this.districtOrError,
      this.streetOrError,
      this.zipCodeOrError,
      this.complementOrError
    );

    const id = data.id;
    const userId = data.userId;

    const state = this.stateOrError.value;
    const city = this.cityOrError.value;
    const district = this.districtOrError.value;
    const street = this.streetOrError.value;
    const zipCode = this.zipCodeOrError.value;
    const complement = this.complementOrError.value;
    const number = data.number || 's/n';
    const lat = data.lat;
    const long = data.long;

    this.toUpdate = this.afterValidate({
      id,
      userId,
      state,
      city,
      district,
      street,
      zipCode,
      number,
      complement,
      lat,
      long
    });
  }

  private set(data: AddressDTO & { userId: string }): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.stateOrError = ValidateString.exec(
      data.state,
      { isOptional: false, maxSize: maxSize.ADDRESS_STATE },
      { errorMessage: errorMessage.state }
    );

    this.cityOrError = ValidateString.exec(
      data.city,
      { isOptional: false, maxSize: maxSize.ADDRESS_CITY },
      { errorMessage: errorMessage.city }
    );

    this.districtOrError = ValidateString.exec(
      data.district,
      { isOptional: false, maxSize: maxSize.ADDRESS_DISTRICT },
      { errorMessage: errorMessage.district }
    );

    this.streetOrError = ValidateString.exec(
      data.street,
      { isOptional: false, maxSize: maxSize.ADDRESS_STREET },
      { errorMessage: errorMessage.street }
    );

    this.zipCodeOrError = ValidateZipCode.exec(
      data.zipCode,
      { isOptional: true, maxSize: maxSize.ADDRESS_ZIP_CODE, minSize: minSize.ADDRESS_ZIP_CODE },
      { errorMessage: errorMessage.zipCode }
    );
    this.complementOrError = ValidateString.exec(
      data.complement,
      { isOptional: true, maxSize: maxSize.ADDRESS_COMPLEMENT },
      { errorMessage: errorMessage.complement }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: AddressDTO & { userId: string }): Errors {
    return {
      state: `The state "${data.state}" is invalid`,
      city: `The city "${data.city}" is invalid`,
      district: `The district "${data.district}" is invalid`,
      street: `The street "${data.street}" is invalid`,
      zipCode: `The zipCode "${data.zipCode}" is invalid`,
      number: `The number "${data.number}" is invalid`,
      complement: `The complement "${data.complement}" is invalid`
    };
  }

  private afterValidate(validated: Validated): UpdateAddressDTO {
    return {
      id: validated.id,
      userId: validated.userId,
      state: validated.state.value.toUpperCase(),
      city: validated.city.value.toUpperCase(),
      district: validated.district.value.toUpperCase(),
      street: validated.street.value.toUpperCase(),
      zipCode: validated.zipCode.value,
      number: validated.number,
      complement: validated.complement.value,
      lat: validated.lat,
      long: validated.long
    };
  }

  public get value(): Readonly<UpdateAddressDTO> {
    return Object.freeze(this.toUpdate);
  }
}
