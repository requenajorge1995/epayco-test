import * as validator from 'email-validator';
import { InvalidArgumentError } from './InvalidArgumentError';

export class EmailValue {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string) {
    if (!validator.validate(value))
      throw new InvalidArgumentError(`<${value}> is not a valid email`);
  }
}