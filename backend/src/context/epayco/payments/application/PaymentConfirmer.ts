import { OrderSearcher } from '../../order/application/OrderSearcher';
import { SecurityToken } from '../../../shared/application/SecurityToken';
import { ConfirmPaymentRequest } from './ConfirmPaymentRequest';
import { UserRepository } from '../../user/domain/UserRepository';
import { UserBalance } from '../../user/domain/attributes/UserBalance';
import { InvalidSecurityTokenError } from '../../../shared/domain/InvalidSecurityTokenError';
import { OrderAlreadyPaidValidator } from './OrderAlreadyPaidValidator';
import { EnoughBalanceValidator } from './EnoughBalanceValidator';
import { OrderRepository } from '../../order/domain/OrderRepository';
import { UserSearcher } from '../../user/application/UserSearcher';

export class PaymentConfirmer {
  private orderSearcher: OrderSearcher;
  private userSearcher: UserSearcher;
  private orderRepository: OrderRepository;
  private userRepository: UserRepository;

  constructor(orderSearcher: OrderSearcher, userSearcher: UserSearcher, orderRepository: OrderRepository, userRepository: UserRepository) {
    this.orderSearcher = orderSearcher;
    this.userSearcher = userSearcher;
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
  }

  async run({ orderId, token }: ConfirmPaymentRequest): Promise<void> {
    const order = await this.orderSearcher.run(orderId);
    const user = await this.userSearcher.searchById(order.userId.value);

    if (!user) throw new Error('');

    if (!SecurityToken.validateToken(token, user.secret.value))
      throw new InvalidSecurityTokenError(`The token <${token}> is invalid`);

    OrderAlreadyPaidValidator.validate(order);
    EnoughBalanceValidator.validate(user, order.total);

    const newBalance = new UserBalance(user.balance.value - order.total.value);
    user.setBalance(newBalance);
    order.markAsPaid();

    await this.orderRepository.update(order);
    await this.userRepository.update(user);
  }
}