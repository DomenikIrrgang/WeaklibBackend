import { Db, MongoError} from "mongodb";
import { DatabaseRequest } from "../DatabaseRequest";

export class FindOne extends DatabaseRequest {

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
        connection.collection(this.collection).findOne(this.query, this.selectors, (error: MongoError, result: any) => {
            this.receivedResult(result, error);
        });
    }
}