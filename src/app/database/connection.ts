import {Document, MongoClient} from 'mongodb';
import {DATABASE_SETTINGS} from '../config/config';

class Connection {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(DATABASE_SETTINGS.URL, {});
  }

  public async startConnecion() {
    await this.client.connect();
  }

  public getCollection<DocumentT extends Document>(collectionName: string) {
    return this.client
      .db(DATABASE_SETTINGS.DATABASE_NAME)
      .collection<DocumentT>(collectionName);
  }
}

const connection = new Connection();
export default connection;
