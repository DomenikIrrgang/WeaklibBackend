import { LogLevel } from "./LogLevel";

export interface Logger {
    log(logLevel: LogLevel, message: string);
}