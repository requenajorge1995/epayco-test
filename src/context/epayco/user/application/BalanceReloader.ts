import { UserRepository } from '../domain/UserRepository';
import { BalanceReloadRequest } from "./BalanceRealoadRequest";
import { UserDocument } from "../domain/attributes/UserDocument";
import { UserPhone } from "../domain/attributes/UserPhone";
import { UserNotFoundError } from '../domain/UserNotFoundError';
import { InvalidArgumentError } from "../../../shared/domain/InvalidArgumentError";
import { UserBalance } from "../domain/attributes/UserBalance";

const MINIMUM_AMOUNT_TO_RELOAD = 1;

export class BalanceReloader {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(balanceReloadRequest: BalanceReloadRequest): Promise<void> {
    const { document, phone, amount } = balanceReloadRequest;

    if (amount <= 0)
      throw new InvalidArgumentError(`Amount error <${amount}>, It must be greater than ${MINIMUM_AMOUNT_TO_RELOAD}`);

    const user = await this.repository.searchByDocumentAndPhone(new UserDocument(document), new UserPhone(phone));
    if (!user) throw new UserNotFoundError(`User with document <${document}> and phone <{${phone}}> not found`);

    const newBalance = new UserBalance(user.balance.value + amount);
    user.setBalance(newBalance);

    this.repository.update(user);
  }
}