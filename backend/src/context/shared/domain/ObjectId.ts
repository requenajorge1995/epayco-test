import { InvalidArgumentError } from "./InvalidArgumentError";
import { Types } from 'mongoose';

export class ObjectId {
  private _value: Types.ObjectId;

  constructor(value: string) {
    this.ensureIsValid(value);
    this._value = Types.ObjectId(value);
  }

  private ensureIsValid(value: string): void {
    if (!Types.ObjectId.isValid(value))
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${value}>`);
  }

  get value(): string {
    return this._value.toHexString();
  }

  static random(): ObjectId {
    const id = Types.ObjectId().toHexString();
    return new ObjectId(id);
  }
}
