
import { Order } from '../domain/Order';
import { OrderRepository } from '../domain/OrderRepository';
import { UserId } from '../../shared/UserId';
import { OrderId } from '../../shared/OrderId';
import { OrderNotFound } from '../domain/OrderNotFound';

export class OrderSearcher {
  private repository: OrderRepository;

  constructor(repository: OrderRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<Order> {
    const order = await this.search(id);
    if (!order) throw new OrderNotFound(`Order with id <${id}> not found`);
    return order;
  };

  private search(id: string) {
    return this.repository.search(new OrderId(id));
  }

  public searchByUser(userId: string): Promise<Order[]> {
    return this.repository.searchByUser(new UserId(userId));
  }

};