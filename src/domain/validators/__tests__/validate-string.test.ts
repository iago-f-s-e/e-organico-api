import { BadRequestException } from '@nestjs/common';
import { ValidateString } from '../validate-string';

describe('String validator', () => {
  it('must be possible to validate a required string value', () => {
    const results = ValidateString.exec(
      'doe',
      { isOptional: false, maxSize: 50 },
      { errorMessage: 'The name "name-tester" is invalid' }
    );

    const string = results.value as ValidateString;

    expect(results.isRight()).toBeTruthy();
    expect(results.isLeft()).not.toBeTruthy();

    expect(results.value).toBeInstanceOf(ValidateString);
    expect(Object.isFrozen(string.value)).toBe(true);
  });

  it('must be possible to validate a optional string value', () => {
    const results = ValidateString.exec(
      'doe',
      { isOptional: true, maxSize: 50 },
      { errorMessage: 'The name "name-tester" is invalid' }
    );

    const string = results.value as ValidateString;

    expect(results.isRight()).toBeTruthy();
    expect(results.isLeft()).not.toBeTruthy();

    expect(results.value).toBeInstanceOf(ValidateString);
    expect(Object.isFrozen(string.value)).toBe(true);
  });

  it('must not be possible a required string value if the value is not received', () => {
    const value = undefined as unknown as string;

    const results = ValidateString.exec(
      value,
      { isOptional: false, maxSize: 50 },
      { errorMessage: 'The name "name-tester" is invalid' }
    );

    expect(results.isLeft()).toBeTruthy();
    expect(results.isRight()).not.toBeTruthy();

    expect(results.value).toBeInstanceOf(BadRequestException);
  });

  it('must not be possible a required string value if received value is empty', () => {
    const results = ValidateString.exec(
      '',
      { isOptional: false, maxSize: 50 },
      { errorMessage: 'The name "name-tester" is invalid' }
    );

    expect(results.isLeft()).toBeTruthy();
    expect(results.isRight()).not.toBeTruthy();

    expect(results.value).toBeInstanceOf(BadRequestException);
  });

  it('must not be possible a required string value if received is less than min size', () => {
    const results = ValidateString.exec(
      'x',
      { isOptional: false, maxSize: 50 },
      { errorMessage: 'The name "name-tester" is invalid' }
    );

    expect(results.isLeft()).toBeTruthy();
    expect(results.isRight()).not.toBeTruthy();

    expect(results.value).toBeInstanceOf(BadRequestException);
  });

  it('must not be possible a required string value if received is more than man size', () => {
    const results = ValidateString.exec(
      'x'.repeat(51),
      { isOptional: false, maxSize: 50 },
      { errorMessage: 'The name "name-tester" is invalid' }
    );

    expect(results.isLeft()).toBeTruthy();
    expect(results.isRight()).not.toBeTruthy();

    expect(results.value).toBeInstanceOf(BadRequestException);
  });
});
