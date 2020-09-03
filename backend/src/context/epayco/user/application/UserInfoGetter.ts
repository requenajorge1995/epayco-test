import { UserSearcher } from './UserSearcher';
import { SearchUserRequest } from './SearchUserRequest';

export class UserInfoGetter {
  private userSearcher: UserSearcher;

  constructor(userSearcher: UserSearcher) {
    this.userSearcher = userSearcher;
  }

  async run(searchUserRequest: SearchUserRequest) {
    const user = await this.userSearcher.run(searchUserRequest);
    return {
      name: user.name.value,
      document: user.document.value,
      email: user.email.value,
      phone: user.phone.value,
      balance: user.balance.value
    };
  };
};