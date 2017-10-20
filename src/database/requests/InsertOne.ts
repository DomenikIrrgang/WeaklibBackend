import { Db, MongoError, InsertOneWriteOpResult } from "mongodb";
import { DatabaseRequest } from "../DatabaseRequest";

export class InsertOne extends DatabaseRequest {

    private collection: string;
    private object: object;

    constructor(collection: string, object: object, callback?: (result: any) => void) {
        super(callback);
        this.collection = collection;
        this.object = object;
    }

    public execute(connection: Db) {
        connection.collection(this.collection).insertOne(this.object, (error: MongoError, result: InsertOneWriteOpResult) => {
            this.receivedResult(result, error);
        });
    }
}