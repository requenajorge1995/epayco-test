import { UserDocument } from './attributes/UserDocument';
import { UserName } from './attributes/UserName';
import { UserEmail } from './attributes/UserEmail';
import { UserPhone } from './attributes/UserPhone';
import { UserId } from '../../shared/UserId';

export class User {
  readonly id: UserId;
  readonly document: UserDocument;
  readonly name: UserName;
  readonly email: UserEmail;
  readonly phone: UserPhone;

  constructor(id: UserId, document: UserDocument, name: UserName, email: UserEmail, phone: UserPhone) {
    this.id = id;
    this.document = document;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      document: this.document.value,
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
    };
  }

  static fromPrimitives(id: string, document: string, name: string, email: string, phone: string): User {
    return new User(
      new UserId(id),
      new UserDocument(document),
      new UserName(name),
      new UserEmail(email),
      new UserPhone(phone),
    );
  }
}