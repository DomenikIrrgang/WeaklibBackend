import { Logger } from "../logging/Logger";
import { ConsoleLogger } from "../logging/ConsoleLogger";
import { FileLogger } from "../logging/FileLogger";
import * as https from "https";
import * as fs from "fs";
import { LogLevel } from "../logging/LogLevel";

/**
 * Configuration of Express.
 */
export class AppConfig {
    public logger: Logger = new ConsoleLogger(true);
    public port: number = 8080;
    public originWhitelist: string[] = [
        "localhost",
    ];
    public hashRound: number = 10;
    public serverOptions: https.ServerOptions = {
        key: fs.readFileSync("./src/certs/key.pem"),
        cert: fs.readFileSync("./src/certs/certificate.pem"),
    };
}

/**
 * Development Appconfig.
 */
export let devAppConfig: AppConfig = new AppConfig();

/**
 * Production Appconfig.
 */
export let productionAppConfig: AppConfig = new AppConfig();
productionAppConfig.port = 8079;
productionAppConfig.logger.setLogLevel(LogLevel.ERROR);
productionAppConfig.logger = new FileLogger("applog", "applog");

/**
 * Test Appconfig.
 */
export let testAppConfig: AppConfig = new AppConfig();
testAppConfig.logger.setLogLevel(LogLevel.ERROR);