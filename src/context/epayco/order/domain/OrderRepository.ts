import { Order } from "./Order";
import { OrderId } from "../../shared/OrderId";
import { UserId } from "../../shared/UserId";
import { Nullable } from "../../../shared/domain/Nullable";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  search(id: OrderId): Promise<Nullable<Order>>;
  searchByUser(userId: UserId): Promise<Order[]>;
}