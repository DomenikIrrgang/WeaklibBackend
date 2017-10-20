import { Logger } from "../logging/Logger";
import { ConsoleLogger } from "../logging/ConsoleLogger";
import { developmentEnvironment } from "./Globals";
import { FileLogger } from "../logging/FileLogger";

export class DatabaseConfig {
    public logger: Logger = new ConsoleLogger(true);
    public port: number = 27017;
    public host: string = "localhost";
    public name: string = "weaklib";

    public getUrl(): string {
        return "mongodb://" + this.host + ":" + this.port + "/" + this.name;
    }
}

export let databaseConfig: DatabaseConfig = new DatabaseConfig();

if (developmentEnvironment === false) {
    databaseConfig.logger = new FileLogger("databaseLog", "databaselog");
}