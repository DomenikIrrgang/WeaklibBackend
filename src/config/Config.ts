import { DatabaseConfig, databaseConfig } from "./DatabaseConfig";
import { AppConfig, appConfig } from "./AppConfig";
import { SessionConfig, sessionConfig } from "./SessionConfig";
import { developmentEnvironment } from "./Globals";

export class Config {
    public database: DatabaseConfig;
    public app: AppConfig;
    public session: SessionConfig;
    public development: boolean;
}

export let config: Config = {
    database: databaseConfig,
    app: appConfig,
    session: sessionConfig,
    development: developmentEnvironment,
};
