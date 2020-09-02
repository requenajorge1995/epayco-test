import { NumberValue } from "./NumberValue";
import { InvalidArgumentError } from "./InvalidArgumentError";

export abstract class PositiveNumberValue extends NumberValue {
  constructor(value: number) {
    super(value);
    this.ensureIsPositive(value);
  }

  private ensureIsPositive(value: number) {
    if (value < 0) throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the negative value ${value}`);
  }
}