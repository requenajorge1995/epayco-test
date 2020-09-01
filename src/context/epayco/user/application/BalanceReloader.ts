import { UserRepository } from '../domain/UserRepository';
import { ReloadBalanceRequest } from "./ReloadBalanceRequest";
import { UserDocument } from "../domain/attributes/UserDocument";
import { UserPhone } from "../domain/attributes/UserPhone";
import { UserNotFoundError } from '../domain/UserNotFoundError';
import { InvalidArgumentError } from "../../../shared/domain/InvalidArgumentError";
import { UserBalance } from "../domain/attributes/UserBalance";
import { UserSearcher } from './UserSearcher';

const MINIMUM_AMOUNT_TO_RELOAD = 1;

export class BalanceReloader {
  private repository: UserRepository;
  private userSearcher: UserSearcher;

  constructor(repository: UserRepository, userSearcher: UserSearcher) {
    this.repository = repository;
    this.userSearcher = userSearcher;
  }

  async run(reloadBalanceRequest: ReloadBalanceRequest): Promise<void> {
    const { document, phone, amount } = reloadBalanceRequest;

    if (amount <= 0)
      throw new InvalidArgumentError(`Amount error <${amount}>, It must be greater than ${MINIMUM_AMOUNT_TO_RELOAD}`);

    const user = await this.userSearcher.run({ document, phone });

    const newBalance = new UserBalance(user.balance.value + amount);
    user.setBalance(newBalance);

    this.repository.update(user);
  }
}