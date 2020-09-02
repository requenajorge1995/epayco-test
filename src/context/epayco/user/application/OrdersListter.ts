
import { Order } from '../../order/domain/Order';
import { UserSearcher } from './UserSearcher';
import { SearchUserRequest } from './SearchUserRequest';
import { OrderSearcher } from '../../order/application/OrderSearcher';

export class OrdersListter {
  private userSearcher: UserSearcher;
  private orderSearcher: OrderSearcher;

  constructor(userSearcher: UserSearcher, orderSearcher: OrderSearcher) {
    this.userSearcher = userSearcher;
    this.orderSearcher = orderSearcher;
  }

  async run(searchUserRequest: SearchUserRequest) {
    const user = await this.userSearcher.run(searchUserRequest);
    const orders = await this.orderSearcher.searchByUser(user.id.value);
    return orders.map(order => {
      const { id, total, isPaid } = order.toPrimitives();
      return { id, total, isPaid };
    });
  };
};