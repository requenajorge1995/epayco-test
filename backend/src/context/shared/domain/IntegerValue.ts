import { InvalidArgumentError } from "./InvalidArgumentError";

export abstract class IntegerValue {
  readonly value: number;

  constructor(value: number) {
    this.ensureIsInteger(value);
    this.value = value;
  }

  private ensureIsInteger(value: number): void {
    if (value % 1 != 0) throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the not integer value ${value}`);
  }
}
