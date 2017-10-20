import { Db, MongoError } from "mongodb";
import { DatabaseRequest } from "../DatabaseRequest";

export class DropCollection extends DatabaseRequest {

  private collection: string;

  constructor(collection: string, callback: (result: any) => void) {
    super(callback);
    this.collection = collection;
  }

  public execute(connection: Db): void {
    connection.dropCollection(this.collection, (error: MongoError) => {
      this.receivedResult(null, error);
    });
  }
}