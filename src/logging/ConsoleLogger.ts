import { Logger } from "./Logger";
import { LogLevel } from "./LogLevel";

/**
 * Logs the message to the default console.
 */
export class ConsoleLogger implements Logger {

    private logDebug: boolean;
    private logLevel: LogLevel = LogLevel.DEBUG;

    constructor(logDebug?: boolean) {
        if (logDebug) {
            this.logDebug = logDebug;
        } else {
            this.logDebug = false;
        }
    }

    public log(logLevel: LogLevel, message: string) {
        if (logLevel >= this.logLevel) {
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
    }

    public setLogLevel(logLevel: LogLevel) {
        this.logLevel = logLevel;
    }

    /**
     * Formats the Loglevel and message to a format that includes both + the current time to a string
     * that can be logged.
     * 
     * @param logLevel Loglevel of the Log.
     * @param message Message that should be logged.
     * @return The formated string.
     */
    private formatMessage(logLevel: LogLevel, message: string): string {
        return new Date().toLocaleString() + " " + LogLevel.toString(logLevel) + ": " + message;
    }

}