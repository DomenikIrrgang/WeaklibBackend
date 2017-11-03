import { Db, MongoError } from "mongodb";
import { DatabaseRequest } from "../DatabaseRequest";

export class DropDatabase extends DatabaseRequest {

  constructor(callback?: (result: any) => void) {
    super(callback);
  }

  public execute(connection: Db): void {
    connection.dropDatabase((error: MongoError) => {
      this.receivedResult(null, error);
    });
  }
}