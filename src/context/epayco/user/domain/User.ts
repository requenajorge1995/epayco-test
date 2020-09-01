import { UserDocument } from './attributes/UserDocument';
import { UserName } from './attributes/UserName';
import { UserEmail } from './attributes/UserEmail';
import { UserPhone } from './attributes/UserPhone';
import { UserId } from '../../shared/UserId';
import { UserBalance } from './attributes/UserBalance';

export class User {
  readonly id: UserId;
  readonly document: UserDocument;
  readonly name: UserName;
  readonly email: UserEmail;
  readonly phone: UserPhone;
  private _balance: UserBalance;

  constructor(id: UserId, document: UserDocument, name: UserName, email: UserEmail, phone: UserPhone, balance: UserBalance) {
    this.id = id;
    this.document = document;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this._balance = balance;
  }

  get balance(): UserBalance {
    return this._balance;
  }

  setBalance(balance: UserBalance): void {
    this._balance = balance;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      document: this.document.value,
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      balance: this.balance.value,
    };
  }

  static fromPrimitives(id: string, document: string, name: string, email: string, phone: string, balance: number): User {
    return new User(
      new UserId(id),
      new UserDocument(document),
      new UserName(name),
      new UserEmail(email),
      new UserPhone(phone),
      new UserBalance(balance)
    );
  }
}