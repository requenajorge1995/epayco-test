import * as mongoose from 'mongoose';

import { dbConfig } from '../../../config/index';

export class MongoDBConnection {

  static async connnect(): Promise<void> {
    return new Promise(function (resolve) {
      mongoose.connect(dbConfig.uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
      const db = mongoose.connection;

      db.on('error', function (error: Error) {
        console.error('Failed to connect to database', error);
        process.exit(1);
      });

      db.once('open', function () {
        console.log('MongoDB successfully connected');
        resolve();
      });
    });
  }

}