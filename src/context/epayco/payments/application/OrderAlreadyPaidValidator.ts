import { Order } from '../../order/domain/Order';
import { OrderAlreadyPaidError } from '../domain/OrderAlreadyPaidError';

export class OrderAlreadyPaidValidator {

  static validate(order: Order): void {
    if (order.isPaid)
      throw new OrderAlreadyPaidError(`Order with id <${order.id.value}> is already paid`);
  }
}