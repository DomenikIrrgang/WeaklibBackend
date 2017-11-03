import { Logger } from "../logging/Logger";
import { ConsoleLogger } from "../logging/ConsoleLogger";
import { FileLogger } from "../logging/FileLogger";
import { LogLevel } from "../logging/LogLevel";

interface DatabaseCollections {
    user: string;
    weakaura: string;
    sessions: string;
    category: string;
    weakauracomment: string;
}

/**
 * Configuration of the database.
 */
export class DatabaseConfig {
    public logger: Logger = new ConsoleLogger(true);
    public port: number = 27017;
    public host: string = "localhost";
    public name: string = "weaklibdev";
    public clear: boolean = true;
    public encryptKey: string = "jlhasdjkl";
    public collections: DatabaseCollections = {
        user: "user",
        weakaura: "weakaura",
        category: "category",
        sessions: "sessions",
        weakauracomment: "weakauracomment",
    };
    public initialized: boolean = false;

    public getUrl(source?: string): string {
        return "mongodb://" + this.host + ":" + this.port + "/" + this.name;
    }
}

/**
 * Testing Databaseconfig.
 */
export let testDatabaseConfig: DatabaseConfig = new DatabaseConfig();
testDatabaseConfig.name = "weaklibtest";
testDatabaseConfig.logger.setLogLevel(LogLevel.ERROR);

/**
 * Development Databaseconfig.
 */
export let devDatabaseConfig: DatabaseConfig = new DatabaseConfig();

/**
 * Production Databaseconfig;
 */
export let productionDatabaseConfig: DatabaseConfig = new DatabaseConfig();
productionDatabaseConfig.clear = false;
productionDatabaseConfig.name = "weaklib";
productionDatabaseConfig.logger.setLogLevel(LogLevel.ERROR);
productionDatabaseConfig.logger = new FileLogger("databaseLog", "databaselog");