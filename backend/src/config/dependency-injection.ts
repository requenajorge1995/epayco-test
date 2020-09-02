import { ContainerBuilder, Reference } from 'node-dependency-injection';

import { MongoDBConnection } from '../context/shared/infrastructure/MongoDBConnection';
import { MongoUserRepository } from '../context/epayco/user/infrastructure/MongoUserRepository';
import { MongoOrderRepository } from '../context/epayco/order/infrastructure/MongoOrderRepository';

import { UserSearcher } from '../context/epayco/user/application/UserSearcher';
import { UserCreator } from '../context/epayco/user/application/UserCreator';
import { BalanceReloader } from '../context/epayco/user/application/BalanceReloader';
import { BalanceChecker } from '../context/epayco/user/application/BalanceChecker';
import { OrderCreator } from '../context/epayco/order/application/OrderCreator';
import { OrderSearcher } from '../context/epayco/order/application/OrderSearcher';
import { OrdersListter } from '../context/epayco/user/application/OrdersListter';
import { OrderPayer } from '../context/epayco/payments/application/OrderPayer';
import { PaymentConfirmer } from '../context/epayco/payments/application/PaymentConfirmer';

import { UserAlreadyExistValidator } from '../context/epayco/user/application/UserAlreadyExistValidator';
import { EmailSender } from '../context/shared/application/EmailSender';

import { CreateUserController } from '../apps/backend/controllers/CreateUserController';
import { CreateOrderController } from '../apps/backend/controllers/CreateOrderController';
import { CheckBalanceController } from '../apps/backend/controllers/CheckBalanceController';
import { ReloadBalanceController } from '../apps/backend/controllers/ReloadBalanceController';
import { UserOrdersController } from '../apps/backend/controllers/UserOrdersController';
import { PayOrderController } from '../apps/backend/controllers/PayOrderController';
import { ConfirmPaymentController } from '../apps/backend/controllers/ConfirmPaymentController';

MongoDBConnection.connnect();

const container = new ContainerBuilder();

container
  .register('UserRepository', MongoUserRepository);
container
  .register('OrderRepository', MongoOrderRepository);
container
  .register('EmailSender', EmailSender);
container
  .register('UserSearcher', UserSearcher)
  .addArgument(new Reference('UserRepository'));
container
  .register('UserAlreadyExistValidator', UserAlreadyExistValidator)
  .addArgument(new Reference('UserRepository'));
container
  .register('UserCreator', UserCreator)
  .addArgument(new Reference('UserRepository'))
  .addArgument(new Reference('UserAlreadyExistValidator'));
container
  .register('BalanceReloader', BalanceReloader)
  .addArgument(new Reference('UserRepository'))
  .addArgument(new Reference('UserSearcher'));
container
  .register('BalanceChecker', BalanceChecker)
  .addArgument(new Reference('UserSearcher'));
container
  .register('OrderCreator', OrderCreator)
  .addArgument(new Reference('OrderRepository'))
  .addArgument(new Reference('UserSearcher'));
container
  .register('OrderSearcher', OrderSearcher)
  .addArgument(new Reference('OrderRepository'));
container
  .register('OrdersListter', OrdersListter)
  .addArgument(new Reference('UserSearcher'))
  .addArgument(new Reference('OrderSearcher'));
container
  .register('OrderPayer', OrderPayer)
  .addArgument(new Reference('OrderSearcher'))
  .addArgument(new Reference('UserSearcher'))
  .addArgument(new Reference('EmailSender'));
container
  .register('PaymentConfirmer', PaymentConfirmer)
  .addArgument(new Reference('OrderSearcher'))
  .addArgument(new Reference('UserSearcher'))
  .addArgument(new Reference('OrderRepository'))
  .addArgument(new Reference('UserRepository'));
container
  .register('CheckBalanceController', CheckBalanceController)
  .addArgument(new Reference('BalanceChecker'));
container
  .register('ConfirmPaymentController', ConfirmPaymentController)
  .addArgument(new Reference('PaymentConfirmer'));
container
  .register('CreateUserController', CreateUserController)
  .addArgument(new Reference('UserCreator'));
container
  .register('CreateOrderController', CreateOrderController)
  .addArgument(new Reference('OrderCreator'));
container
  .register('UserOrdersController', UserOrdersController)
  .addArgument(new Reference('OrdersListter'));
container
  .register('PayOrderController', PayOrderController)
  .addArgument(new Reference('OrderPayer'));
container
  .register('ReloadBalanceController', ReloadBalanceController)
  .addArgument(new Reference('BalanceReloader'));


container.compile();
export default container;
