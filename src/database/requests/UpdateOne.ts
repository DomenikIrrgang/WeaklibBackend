import { Db, MongoError, UpdateWriteOpResult } from "mongodb";
import { DatabaseRequest } from "../DatabaseRequest";

export class UpdateOne extends DatabaseRequest {

    private collection: string;
    private query: object;
    private update: object;
    private options: object;

    constructor(collection: string, query: object, update: object, options?: object, callback?: (result: any, error?: MongoError) => void) {
        super(callback);
        this.collection = collection;
        this.query = query;
        this.options = options;
        this.update = update;
    }

    public execute(connection: Db) {
        connection.collection(this.collection).updateOne(
            this.query, this.update, this.options, (error: MongoError, result: UpdateWriteOpResult) => {
                this.receivedResult(result, error);
            });
    }
}