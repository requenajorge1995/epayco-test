import { OrderTotal } from "./attributes/OrderTotal";
import { OrderId } from "../../shared/domain/OrderId";
import { UserId } from "../../shared/domain/UserId";

export class Order {
  readonly id: OrderId;
  readonly userId: UserId;
  readonly total: OrderTotal;
  private _isPaid: boolean;

  constructor(id: OrderId, userId: UserId, total: OrderTotal, isPaid: boolean) {
    this.id = id;
    this.total = total;
    this.userId = userId;
    this._isPaid = isPaid;
  }

  get isPaid() {
    return this._isPaid;
  }

  markAsPaid() {
    this._isPaid = true;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      userId: this.userId.value,
      total: this.total.value,
      isPaid: this.isPaid,
    };
  }

  static fromPrimitives(id: string, userId: string, total: number, isPaid: boolean): Order {
    return new Order(
      new OrderId(id),
      new UserId(userId),
      new OrderTotal(total),
      isPaid,
    );

  }
}