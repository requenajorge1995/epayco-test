import { StringValue } from '../../../../shared/domain/StringValue';
import { InvalidArgumentError } from "../../../../shared/domain/InvalidArgumentError";

const MAX_LENGTH = 11;
const MIN_LENGTH = 6;

export class UserDocument extends StringValue {
  constructor(value: string) {
    super(value);
    this.ensureIsValidLength(value);
  }

  private ensureIsValidLength(value: string): void {
    if (value.length < MIN_LENGTH || value.length > MAX_LENGTH)
      throw new InvalidArgumentError(`<${this.constructor.name}> must have ${MIN_LENGTH}-${MAX_LENGTH} characters`);
  }
}