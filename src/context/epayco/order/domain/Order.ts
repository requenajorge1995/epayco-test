import { OrderTotal } from "./attributes/OrderTotal";
import { OrderId } from "../../shared/domain/OrderId";
import { UserId } from "../../shared/domain/UserId";

export class Order {
  readonly id: OrderId;
  readonly userId: UserId;
  readonly total: OrderTotal;

  constructor(id: OrderId, userId: UserId, total: OrderTotal) {
    this.id = id;
    this.total = total;
    this.userId = userId;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      userId: this.userId.value,
      total: this.total.value
    };
  }

  static fromPrimitives(id: string, userId: string, total: number): Order {
    return new Order(
      new OrderId(id),
      new UserId(userId),
      new OrderTotal(total)
    );

  }
}