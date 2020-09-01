import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { CreateUserRequest } from "./CreateUserRequest";
import { ObjectId } from "../../../shared/domain/ObjectId";
import { Validator } from '../../../shared/application/Validator';

export class UserCreator {
  private repository: UserRepository;
  private validators: Validator<User>[];

  constructor(repository: UserRepository, ...validator: Validator<User>[]) {
    this.repository = repository;
    this.validators = validator;
  }

  async run(createUserRequest: CreateUserRequest): Promise<void> {
    const { document, name, email, phone } = createUserRequest;
    const id = ObjectId.random().value;
    const user = User.fromPrimitives(id, document, name, email, phone);

    await this.validate(user);

    await this.repository.save(user);
  }

  private async validate(user: User): Promise<void> {
    await Promise.all(
      this.validators.map(validator => validator.validate(user))
    );
  }

}