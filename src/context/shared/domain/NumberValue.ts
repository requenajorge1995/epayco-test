export abstract class NumberValue {
  readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  compareTo(other: NumberValue): number {
    return this.value - other.value;
  }

  toString() {
    return this.value.toString;
  }
}
