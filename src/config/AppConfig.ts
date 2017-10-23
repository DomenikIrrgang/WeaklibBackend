import { Logger } from "../logging/Logger";
import { ConsoleLogger } from "../logging/ConsoleLogger";
import { FileLogger } from "../logging/FileLogger";
import { developmentEnvironment } from "./Globals";

export class AppConfig {
    public logger: Logger = new ConsoleLogger(true);
    public port: number = 8080;
    public originWhitelist: string[] = [
        "http://localhost:4200",
    ];
}

export let appConfig: AppConfig = new AppConfig();

if (developmentEnvironment === false) {
    appConfig.logger =  new FileLogger("applog", "applog");
}