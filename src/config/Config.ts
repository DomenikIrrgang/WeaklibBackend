import { DatabaseConfig, databaseConfig } from "./DatabaseConfig";
import { AppConfig, appConfig } from "./AppConfig";
import { SessionConfig, sessionConfig } from "./SessionConfig";

export class Config {
    public database: DatabaseConfig;
    public app: AppConfig;
    public session: SessionConfig;
}

export let config: Config = {
    database: databaseConfig,
    app: appConfig,
    session: sessionConfig,
};
