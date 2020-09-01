import { OrderTotal } from "./attributes/OrderTotal";
import { OrderId } from "../../shared/OrderId";
import { UserId } from "../../shared/UserId";
import { User } from "../../user/domain/User";

export class Order {
  private id: OrderId;
  private userId: UserId;
  private total: OrderTotal;

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