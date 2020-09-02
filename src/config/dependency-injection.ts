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
import { OrderPayer } from '../context/epayco/payments/application/OrderPayer';
import { PaymentConfirmer } from '../context/epayco/payments/application/PaymentConfirmer';

import { UserAlreadyExistValidator } from '../context/epayco/user/application/UserAlreadyExistValidator';

import { EmailSender } from '../context/shared/application/EmailSender';

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
  .addArgument(new Reference('OrderRepository'));
container
  .register('OrderSearcher', OrderSearcher)
  .addArgument(new Reference('OrderRepository'));
container
  .register('OrderPayer', OrderPayer)
  .addArgument(new Reference('OrderSearcher'))
  .addArgument(new Reference('UserSearcher'))
  .addArgument(new Reference('EmailSender'));
container
  .register('PaymentConfirmer', PaymentConfirmer)
  .addArgument(new Reference('OrderSearcher'))
  .addArgument(new Reference('OrderRepository'))
  .addArgument(new Reference('UserRepository'));

container.compile();
export default container;
