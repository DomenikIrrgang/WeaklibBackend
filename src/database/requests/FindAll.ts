import { Db, MongoError } from "mongodb";
import { DatabaseRequest } from "../DatabaseRequest";

export class FindAll extends DatabaseRequest {

    private collection: string;
    private query: object;
    private selectors: object;

    constructor(collection: string, query: object, selectors: object, callback: (result: any) => void) {
        super(callback);
        this.collection = collection;
        this.query = query;
        this.selectors = selectors;
    }

    public execute(connection: Db) {
        connection.collection(this.collection).find(this.query, this.selectors).toArray((error: MongoError, result: any) => {
            this.receivedResult(result, error);
        });
    }
}