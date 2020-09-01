import { User } from '../../user/domain/User';
import { NotEnoughBalanceError } from '../domain/NotEnoughBalanceError';
import { OrderTotal } from '../../order/domain/attributes/OrderTotal';

export class EnoughBalanceValidator {

  static validate(user: User, total: OrderTotal): void {
    if (user.balance.value < total.value)
      throw new NotEnoughBalanceError(`You need to have at least a balance of <${total.value}> to pay for this order. Your current balance is <${user.balance.value}>`);
  }
}