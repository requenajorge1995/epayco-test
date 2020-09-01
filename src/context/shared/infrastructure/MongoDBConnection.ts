import * as mongoose from 'mongoose';
import { MONGO_DB_URI } from '../../../config/index';

export class MongoDBConnection {

  static async connect() {
    await mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    console.log('MongoDB successfully connected');
  }

  static async close() {
    await mongoose.connection.close();
    console.log('MongoDB successfully closed');
  }

}