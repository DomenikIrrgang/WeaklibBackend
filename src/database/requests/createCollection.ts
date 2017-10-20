import { Db, MongoError, Collection } from "mongodb";
import { DatabaseRequest } from "../DatabaseRequest";

export class CreateCollection extends DatabaseRequest {

  private collection: string;

  constructor(collection: string, callback: (result: any) => void) {
    super(callback);
    this.collection = collection;
  }

  public execute(connection: Db): void {
    connection.createCollection(this.collection, (error: MongoError, result: Collection<any>) => {
      this.receivedResult(result, error);
    });
  }
}