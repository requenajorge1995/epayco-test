import { UserRepository } from '../domain/UserRepository';
import { SearchUserRequest } from './SearchUserRequest';
import { UserNotFoundError } from '../domain/UserNotFoundError';
import { User } from '../domain/User';
import { UserDocument } from '../domain/attributes/UserDocument';
import { UserPhone } from '../domain/attributes/UserPhone';

export class UserSearcher {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run({ document, phone }: SearchUserRequest): Promise<User> {
    const user = await this.searchByDocumentAndPhone(document, phone);
    if (!user) throw new UserNotFoundError(`User with document <${document}> and phone <{${phone}}> not found`);
    return user;
  };

  private searchByDocumentAndPhone(document: string, phone: string) {
    return this.repository.searchByDocumentAndPhone(new UserDocument(document), new UserPhone(phone));
  }

};