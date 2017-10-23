import * as mongoConnect from "connect-mongo";
import { SessionOptions } from "express-session";
import * as session from "express-session";
import { databaseConfig } from "./DatabaseConfig";

let MongoStore = mongoConnect(session);

export class SessionConfig {
    public init: SessionOptions = {
        secret: "iloveweakauras",
        resave: false,
        store: new MongoStore({
            url: databaseConfig.getUrl(),
            collection: "sessions",
        }),
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: false,
        },
    };
}

export let sessionConfig: SessionConfig = new SessionConfig();