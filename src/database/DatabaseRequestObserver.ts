import { DatabaseRequest } from "./DatabaseRequest";
import { MongoError } from "mongodb";

export interface DatabaseRequestObserver {

    /**
     * Success is called when a request successfully received a response from the database.
     *
     * @param databaseRequest Request that received a response.
     *
     */
    success(databaseRequest: DatabaseRequest): void;

    /**
     * Error is called when a request failed to receive a successful response from the database.
     *
     * @param databaseRequest Request that received a response.
     *
     */
    error(databaseRequest: DatabaseRequest, error: MongoError): void;
}