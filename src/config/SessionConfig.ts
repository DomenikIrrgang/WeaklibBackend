import * as session from "express-session";
import { SessionOptions } from "express-session";
import * as connectMongo from "connect-mongo";
import { devDatabaseConfig, productionDatabaseConfig, testDatabaseConfig } from "./DatabaseConfig";

let MongoStore = connectMongo(session);

export class SessionConfig {
    public options: SessionOptions =  {
        secret: "adsfggafg",
        resave: false,
        store: null,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: false,
        },
    };
}

export let devSessionConfig: SessionConfig = new SessionConfig();
devSessionConfig.options.store = new MongoStore({
    url: devDatabaseConfig.getUrl(),
    collection: devDatabaseConfig.collections.sessions,
});

export let testSessionConfig: SessionConfig = new SessionConfig();
testSessionConfig.options.store = new MongoStore({
    url: testDatabaseConfig.getUrl(),
    collection: testDatabaseConfig.collections.sessions,
});
export let productionSessionConfig: SessionConfig = new SessionConfig();
productionSessionConfig.options.store = new MongoStore({
    url: productionDatabaseConfig.getUrl(),
    collection: productionDatabaseConfig.collections.sessions,
});