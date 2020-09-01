import { UserSearcher } from "./UserSearcher";
import { SearchUserRequest } from "./SearchUserRequest";

export class BalanceChecker {
  private userSearcher: UserSearcher;

  constructor(userSearcher: UserSearcher) {
    this.userSearcher = userSearcher;
  }

  async run(searchUserRequest: SearchUserRequest): Promise<number> {
    const { balance } = await this.userSearcher.run(searchUserRequest);
    return balance.value;
  }
}