import { OrderRepository } from "../domain/OrderRepository";
import { CreateOrderRequest } from "./CreateOrderRequest";
import { ObjectId } from "../../../shared/domain/ObjectId";
import { Order } from '../domain/Order';
import { UserSearcher } from "../../user/application/UserSearcher";

export class OrderCreator {
  private orderRepository: OrderRepository;
  private userSearcher: UserSearcher;

  constructor(orderRepository: OrderRepository, userSearcher: UserSearcher) {
    this.orderRepository = orderRepository;
    this.userSearcher = userSearcher;
  }

  async run(createOrderRequest: CreateOrderRequest): Promise<void> {
    const { document, phone, total } = createOrderRequest;
    const id = ObjectId.random().value;
    const user = await this.userSearcher.run({ document, phone });

    const order = Order.fromPrimitives(id, user.id.value, total, false);
    await this.orderRepository.save(order);
  }
}