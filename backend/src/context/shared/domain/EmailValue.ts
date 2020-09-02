import * as validator from 'email-validator';
import { InvalidArgumentError } from './InvalidArgumentError';
import { StringValue } from './StringValue';

export class EmailValue extends StringValue {

  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string) {
    if (!validator.validate(value))
      throw new InvalidArgumentError(`<${value}> is not a valid email`);
  }
}