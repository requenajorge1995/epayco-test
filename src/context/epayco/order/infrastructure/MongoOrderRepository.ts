import { OrderRepository } from '../domain/OrderRepository';
import { Order } from '../domain/Order';
import { OrderId } from '../../shared/domain/OrderId';
import { MongoOrderModel, IOrderMongo } from './MongoOrderModel';
import { Nullable } from '../../../shared/domain/Nullable';
import { UserId } from '../../shared/domain/UserId';

export class MongoOrderRepository implements OrderRepository {

  async save(order: Order): Promise<void> {
    const { id: _id, ...otherProps } = order.toPrimitives();
    const orderMongoDocument = new MongoOrderModel({ _id, ...otherProps });
    await orderMongoDocument.save();
  }

  async update(order: Order): Promise<void> {
    const { id: _id, isPaid } = order.toPrimitives();
    await MongoOrderModel.findByIdAndUpdate(_id, { isPaid });
  }

  async search(id: OrderId): Promise<Nullable<Order>> {
    const orderMongo = await MongoOrderModel.findById(id.value);
    if (!orderMongo) return null;
    return this.dataModelToOrder(orderMongo.toJSON());
  }

  async searchByUser(userId: UserId): Promise<Order[]> {
    const orderMongoList = await MongoOrderModel.find({ userId: userId.value });
    return orderMongoList.map(orderMongo => this.dataModelToOrder(orderMongo.toJSON()));
  }

  private dataModelToOrder(dataModel: IOrderMongo): Order {
    const { _id, userId, total, isPaid } = dataModel;
    return Order.fromPrimitives(_id, userId, total, isPaid);
  }

}