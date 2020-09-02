import { Validator } from '../../../shared/application/Validator';
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserDocument } from "../domain/attributes/UserDocument";
import { UserAlreadyExistError } from '../domain/UserAlreadyExistError';

export class UserAlreadyExistValidator implements Validator<User> {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async validate(user: User): Promise<void> {
    if (await this.userExist(user.document))
      throw new UserAlreadyExistError(`User with document <${user.document.value}> already registered`);
  }

  private async userExist(document: UserDocument): Promise<boolean> {
    return !! await this.repository.searchByDocument(document);
  }

}