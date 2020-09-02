import { OrderSearcher } from '../../order/application/OrderSearcher';
import { UserSearcher } from '../../user/application/UserSearcher';
import { NotEnoughBalanceError } from '../domain/NotEnoughBalanceError';
import { SecurityToken } from '../../../shared/application/SecurityToken';
import { EmailSender } from '../../../shared/application/EmailSender';
import { OrderAlreadyPaidValidator } from './OrderAlreadyPaidValidator';
import { EnoughBalanceValidator } from './EnoughBalanceValidator';

export class OrderPayer {
  private orderSearcher: OrderSearcher;
  private userSearcher: UserSearcher;
  private emailSender: EmailSender;

  constructor(orderSearcher: OrderSearcher, userSearcher: UserSearcher, emailSender: EmailSender) {
    this.orderSearcher = orderSearcher;
    this.userSearcher = userSearcher;
    this.emailSender = emailSender;
  };

  async run(orderId: string): Promise<void> {
    const order = await this.orderSearcher.run(orderId);
    const user = await this.userSearcher.searchById(order.userId.value);

    OrderAlreadyPaidValidator.validate(order);
    EnoughBalanceValidator.validate(user, order.total);

    const token = SecurityToken.generateToken(user.secret.value);
    this.emailSender.send(user.email.value, `Your security token is ${token}`);
  }

}