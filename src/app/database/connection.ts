import {Document, MongoClient} from 'mongodb';
import {DATABASE} from '../config/config';

class Connection {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(DATABASE.URL, {});
  }

  public async startConnecion() {
    await this.client.connect();
  }

  public getCollection<DocumentT extends Document>(collectionName: string) {
    return this.client
      .db(DATABASE.DATABASE_NAME)
      .collection<DocumentT>(collectionName);
  }
}

const connection = new Connection();
export default connection;
