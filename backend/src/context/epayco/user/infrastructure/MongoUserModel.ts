import { Schema, model, Document } from 'mongoose';

export interface IUserMongo extends Document {
  _id: string;
  document: string;
  name: string;
  email: string;
  phone: string;
  secret: string;
  balance: number;
}

const userSchema = new Schema({
  document: String,
  name: String,
  email: String,
  phone: String,
  secret: String,
  balance: Number,
});

export const MongoUserModel = model<IUserMongo>('User', userSchema);
