import { OrderRepository } from "../domain/OrderRepository";
import { CreateOrderRequest } from "./CreateOrderRequest";
import { ObjectId } from "../../../shared/domain/ObjectId";
import { Order } from '../domain/Order';

export class OrderCreator {
  private repository: OrderRepository;

  constructor(repository: OrderRepository) {
    this.repository = repository;
  }

  async run(createOrderRequest: CreateOrderRequest): Promise<void> {
    const { userId, total } = createOrderRequest;
    const id = ObjectId.random().value;
    const order = Order.fromPrimitives(id, userId, total, false);

    await this.repository.save(order);
  }
}