import { Db, MongoError } from "mongodb";
import { DatabaseRequest } from "../DatabaseRequest";

export class CreateIndex extends DatabaseRequest {

    private collection: string;
    private fields: object;
    private options: object;

    constructor(collection: string, fields: object, options: object, callback?: (result: any, error?: MongoError) => void) {
        super(callback);
        this.collection = collection;  
        this.fields = fields;
        this.options = options;
    }

    public execute(connection: Db) {
        connection.collection(this.collection).createIndex(this.fields, this.options, (error: MongoError, result: any) => {
            this.receivedResult(result, error);
        });
    }
}