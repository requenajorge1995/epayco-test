import { InvalidArgumentError } from '../../../context/shared/domain/InvalidArgumentError';

type IsNullOrUndefinedObj = {
  [x: string]: any;
};

export function isNullOrUndefined(obj: IsNullOrUndefinedObj): void {

  Object.entries(obj)
    .forEach(tuple => {
      if (tuple[1] === null || tuple[1] === undefined) {
        throw new InvalidArgumentError(`Value <${tuple[0]}> must de specified`);
      }
    });

}