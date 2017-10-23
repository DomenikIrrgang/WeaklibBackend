import { Db, MongoError, InsertWriteOpResult } from "mongodb";
import { DatabaseRequest } from "../DatabaseRequest";

export class InsertMany extends DatabaseRequest {

    private collection: string;
    private data: object[];

    constructor(collection: string, data: object[], callback?: (result: any, error: MongoError) => void) {
        super(callback);
        this.collection = collection;
        this.data = data;
    }

    public execute(connection: Db) {
        connection.collection(this.collection).insertMany(this.data, (error: MongoError, result: InsertWriteOpResult) => {
            this.receivedResult(result, error);
        });
    }
}