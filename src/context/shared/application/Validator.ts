export interface Validator<T> {
  validate(obj: T): Promise<void>;
}