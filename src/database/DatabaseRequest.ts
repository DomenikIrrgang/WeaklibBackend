import { Db } from "mongodb";
import { MongoError } from "mongodb";
import { DatabaseRequestObserver } from "./DatabaseRequestObserver";

export abstract class DatabaseRequest {

    protected observers: DatabaseRequestObserver[] = [];
    protected callback: (result: any, error?: MongoError) => void;
    private sent: boolean = false;

    public constructor(callback: (result: any, error?: MongoError) => void) {
        this.callback = callback;
    }

    public abstract execute(connection: Db): void;

    public addObserver(observer: DatabaseRequestObserver): void {
        this.observers.push(observer);
    }

    public isSent(): boolean {
        return this.sent;
    }

    public setSent(sent: boolean) {
        this.sent = sent;
    }

    protected notifyAllSuccess(): void {
        for (let observer of this.observers) {
            observer.success(this);
        }
    }

    protected notifyAllError(error: MongoError): void {
        for (let observer of this.observers) {
            observer.error(this, error);
        }
    }

    protected receivedResult(result: any, error: MongoError): void {
        if (this.callback) {
            this.callback(result, error);
        }
        if (error) {
            this.notifyAllError(error);
        } else {
            this.notifyAllSuccess();
        }
    }

}