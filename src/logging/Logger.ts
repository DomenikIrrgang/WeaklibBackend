import { LogLevel } from "./LogLevel";

/**
 * Logs message for different LogLevels.
 */
export interface Logger {
    /**
     * Logs a message with a certain LogLevel.
     */
    log(logLevel: LogLevel, message: string): void;

    /**
     * Sets the threshold for a LogLevel;
     * 
     * @param logLevel Loglevel to be set.
     */
    setLogLevel(logLevel: LogLevel): void;
}