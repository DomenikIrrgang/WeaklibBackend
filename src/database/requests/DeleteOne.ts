import { Db, MongoError, DeleteWriteOpResultObject } from "mongodb";
import { DatabaseRequest } from "../DatabaseRequest";

export class DeleteOne extends DatabaseRequest {

  private collection: string;
  private filter: object;

  constructor(collection: string, filter: object, callback: (result: any) => void) {
    super(callback);
    this.collection = collection;
    this.filter = filter;
  }

  public execute(connection: Db): void {
    connection.collection(this.collection).deleteOne(this.filter, (error: MongoError, result: DeleteWriteOpResultObject) => {
      this.receivedResult(result, error);
    });
  }
}