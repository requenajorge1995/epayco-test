import { InvalidArgumentError } from "./InvalidArgumentError";

const phoneNumberRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export class PhoneNumberValue {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidFormat(value);
    this.value = value;
  }

  private ensureIsValidFormat(value: string): void {
    if (!phoneNumberRegExp.test(value))
      throw new InvalidArgumentError(`<${value}> is not a valid phone number`);
  }
}