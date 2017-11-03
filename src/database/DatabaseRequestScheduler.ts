import { DatabaseRequestObserver } from "./DatabaseRequestObserver";
import { DatabaseRequest } from "./DatabaseRequest";
import { MongoClient, Db, MongoError } from "mongodb";
import { config } from "../config/Config";
import { LogLevel } from "../logging/LogLevel";

/**
 * A DatahaseRequestScheduler can be used to execute multiple request on the same MongoDB connection.
 */
export class DatabaseRequestScheduler implements DatabaseRequestObserver {
    /**
     * Array of queued database requests.
     */
    private databaseRequests: DatabaseRequest[] = [];

    /**
     * Number of requests that completed successfully or with an error.
     */
    private requestsCompleted: number = 0;

    /**
     * Number of requests that have been sent.
     */
    private requestsSent: number = 0;

    /**
     * Connection to a MongoDB server. Only defined after scheduleRequest has been called atleast once.
     */
    private connection: Db;

    /**
     * The disconnect callback is called when then connection to the database is closed.
     */
    private disconnectCallback: () => void;

    /**
     * The connect callback is called the moment a connection to the database is opened.
     */
    private connectCallback: () => void;

    /**
     * Url of the database to connect to.
     */
    private databaseUrl: string = config.database.getUrl();

    /**
     *  Creates a new instance of the DatabaseRequestScheduler class.
     *
     * @param connectCallback This function is called when a connection to the database is established.
     * @param disconnectCallback This function is callen when the connection to a database is closed.
     */
    constructor(connectCallback?: () => void, disconnectCallback?: () => void, databaseUrl?: string) {
        this.connectCallback = connectCallback;
        this.disconnectCallback = disconnectCallback;
        if (databaseUrl !== undefined) {
            this.databaseUrl = databaseUrl;
        }
    }

    public success(databaseRequest: DatabaseRequest): void {
        this.requestsCompleted++;
        this.checkEndConnection();
    }

    public error(databaseRequest: DatabaseRequest, error: MongoError): void {
        this.requestsCompleted++;
        config.database.logger.log(LogLevel.ERROR, "Request ended in an error " + databaseRequest.toString() + " " + error);
        this.checkEndConnection();
    }

    /**
     * Schedules a DatabaseRequest that is to be executed with the next executeRequests() call.
     *
     * @param databaseRequest DatabaseRequests that is supposed to get scheduled.
     */
    public scheduleRequest(databaseRequest: DatabaseRequest): void {
        this.databaseRequests.push(databaseRequest);
        databaseRequest.addObserver(this);
    }

    /**
     * Executes a single DatabaseRequest immeadieatly.
     *
     * @param databaseRequest The DatabaseRequest that is supposed to get executed.
     */
    public executeSingleRequest(databaseRequest: DatabaseRequest): void {
        databaseRequest.addObserver(this);
        this.connect((error: MongoError) => {
            if (error === undefined) {
                this.sendRequest(databaseRequest);
            }
        });
    }

    /**
     * Establishes a connection to a MongoDB server and executes all requests scheduled. If executeRequests() already
     * has been called the existing connection is used an only newly scheduled requests are send.
     *
     */
    public executeRequests(): void {
        this.connect((error: MongoError) => {
            if (error === undefined) {
                this.sendRequests();
            }
        });
    }

    /**
     * Returns true if a connecting to the database is active, otherwise false.
     *
     * @returns True if connection is active.
     */
    public connectionActive(): boolean {
        return this.connection !== undefined;
    }

    /**
     * Returns the number of requests that have been scheduled using scheduleRequest().
     *
     * @returns Number of requests scheduled.
     */
    public getNumberOfRequestsScheduled(): number {
        return this.databaseRequests.length;
    }

    /**
     * Returns the number of requests that have been executed.
     *
     * @returns Number of requests executed.
     */
    public getNumberOfRequestsSent(): number {
        return this.requestsSent;
    }

    /**
     * Returns the number of requests that have been completed either successfully or with an error.
     *
     * @returns Number of requests that have been completed.
     */
    public getNumberOfRequestsCompleted(): number {
        return this.requestsCompleted;
    }

    /**
     * Sends all requests that have not been sent yet using the connection established using executeRequests().
     */
    private sendRequests(): void {
        if (this.databaseRequests.length > this.requestsSent) {
            for (let i: number = this.requestsSent; i < this.databaseRequests.length; i++) {
                this.sendRequest(this.databaseRequests[i]);
            }
        }
        this.checkEndConnection();
    }

    /**
     * Sends a single request to the database server.
     *
     * @param request Request that is supposed to get send.
     */
    private sendRequest(databaseRequest: DatabaseRequest): void {
        databaseRequest.setSent(true);
        this.requestsSent++;
        databaseRequest.execute(this.connection);
    }

    /**
     * Establishes a connection to the MongoDB server and calls callback if the connection has been established,
     * is already established or failed to establish.
     *
     * @param callback Error is undefined if connection is active. Otherwise contains an MongoError instance.
     */
    private connect(callback: (error: MongoError) => void): void {
        if (!this.connectionActive()) {
            config.database.logger.log(LogLevel.DEBUG, "connecting to " + this.databaseUrl);
            new MongoClient().connect(this.databaseUrl, (error: MongoError, connection: Db) => {
                if (error) {
                    config.database.logger.log(LogLevel.ERROR, "Could not connect to MongoDB server at " + this.databaseUrl);
                    if (callback) {
                        callback(error);
                    }
                } else {
                    config.database.logger.log(LogLevel.DEBUG, "connection to " + this.databaseUrl + " established!");
                    this.connection = connection;
                    if (this.connectCallback) {
                        this.connectCallback();
                    }
                    if (callback) {
                        callback(undefined);
                    }
                }
            });
        } else {
            if (callback) {
                callback(undefined);
            }
        }
    }

    /**
     * Checks if all requests that have been scheduled have finished. If true closes the connection, otherwise does nothing.
     */
    private checkEndConnection(): void {
        if (this.connectionActive() && this.databaseRequests.length <= this.requestsCompleted) {
            this.connection.close();
            config.database.logger.log(LogLevel.DEBUG, "connection to " + this.databaseUrl + " closed");
            this.connection = undefined;
            if (this.disconnectCallback) {
                this.disconnectCallback();
            }
        }
    }
}