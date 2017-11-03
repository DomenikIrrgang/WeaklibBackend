import { DatabaseConfig, devDatabaseConfig, productionDatabaseConfig, testDatabaseConfig } from "./DatabaseConfig";
import { AppConfig, devAppConfig, productionAppConfig, testAppConfig } from "./AppConfig";
import { SessionConfig, devSessionConfig, testSessionConfig, productionSessionConfig } from "./SessionConfig";

/**
 * General Configuration of the Backend.
 */
export class Config {
    public database: DatabaseConfig;
    public app: AppConfig;
    public sessionconfig: SessionConfig;
    public environment: string;
}

let environment: string = "development";
let configs: { [environment: string]: Config } = {};

configs.test = {
    database: testDatabaseConfig,
    app: testAppConfig,
    sessionconfig: testSessionConfig,
    environment: "test",
};

configs.production = {
    database: productionDatabaseConfig,
    app: productionAppConfig,
    sessionconfig: productionSessionConfig,
    environment: "production",
};

configs.development = {
    database: devDatabaseConfig,
    app: devAppConfig,
    sessionconfig: devSessionConfig,
    environment: "devlelopment",
};

let config: Config = configs[environment];

export let setConfig = (env: string) => {
    if (configs[env]) {
        config = configs[env];
    }
};

export { config as config };