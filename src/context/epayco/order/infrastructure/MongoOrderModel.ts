import { Schema, model, Document } from 'mongoose';

export interface IOrderMongo extends Document {
  _id: string;
  userId: string;
  total: number;
}

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  total: Number,
});

export const MongoOrderModel = model<IOrderMongo>('Order', orderSchema);
