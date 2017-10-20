import { Logger } from "./Logger";
import { LogLevel } from "./LogLevel";
import { developmentEnvironment } from "../config/Globals";

export class ConsoleLogger implements Logger {

    private logDebug: boolean;

    constructor(logDebug?: boolean) {
        if (logDebug) {
            this.logDebug = logDebug;
        } else {
            this.logDebug = developmentEnvironment;
        }
    }

    public log(logLevel: LogLevel, message: string) {
        switch (logLevel) {
            case LogLevel.ERROR: {
                console.error(this.formatMessage(logLevel, message));
                break;
            }
            case LogLevel.DEBUG: {
                if (this.logDebug === true) {
                    console.log(this.formatMessage(logLevel, message));
                }
                break;
            }
            default: {
                console.log(this.formatMessage(logLevel, message));
                break;
            }
        }
    }

    private formatMessage(logLevel: LogLevel, message: string): string {
        return new Date().toLocaleString() + " " + logLevel + ": " + message;
    }

}