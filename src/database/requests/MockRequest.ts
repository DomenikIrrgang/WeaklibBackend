import { Db } from "mongodb";
import { DatabaseRequest } from "../DatabaseRequest";

export class MockRequest extends DatabaseRequest {

    private result: string;

    constructor(result: string, callback: (result: any) => void) {
        super(callback);
        this.result = result;
    }

    public execute(connection: Db) {
        this.receivedResult(this.result, null);
    }
}