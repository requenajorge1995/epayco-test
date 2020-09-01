import { Order } from "./Order";
import { OrderId } from "../../shared/domain/OrderId";
import { UserId } from "../../shared/domain/UserId";
import { Nullable } from "../../../shared/domain/Nullable";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  update(order: Order): Promise<void>;
  search(id: OrderId): Promise<Nullable<Order>>;
  searchByUser(userId: UserId): Promise<Order[]>;
}