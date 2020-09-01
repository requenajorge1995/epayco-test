import { StringValue } from '../../../../shared/domain/StringValue';
import { InvalidArgumentError } from '../../../../shared/domain/InvalidArgumentError';

const MAX_LENGTH = 50;
const MIN_LENGTH = 3;

export class UserName extends StringValue {
  constructor(value: string) {
    super(value);
    this.ensureIsValidLength(value);
  }

  private ensureIsValidLength(value: string): void {
    if (value.length < MIN_LENGTH || value.length > MAX_LENGTH)
      throw new InvalidArgumentError(`<${this.constructor.name}> must have ${MIN_LENGTH}-${MAX_LENGTH} characters`);
  }
}