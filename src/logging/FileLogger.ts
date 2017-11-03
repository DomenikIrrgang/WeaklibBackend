import { Logger } from "./Logger";
import { LogLevel } from "./LogLevel";
import { ConsoleLogger } from "./ConsoleLogger";
import * as fileSystem from "fs";

export class FileLogger implements Logger {

    private fileCreated: boolean = false;
    private path: string = "./logs/";
    private backupLogger: Logger = new ConsoleLogger();
    private logDebug: boolean;
    private logLevel: LogLevel;

    constructor(private title: string, private fileName: string, logDebug?: boolean, path?: string) {
        if (path) {
            this.path = path;
        }
        if (logDebug) {
            this.logDebug = logDebug;
            this.backupLogger = new ConsoleLogger(logDebug);
        } else {
            this.logDebug = false;
        }
        this.checkFileExists(true);
    }

    public log(logLevel: LogLevel, message: string): void {
        if (this.logLevel <= logLevel) {
            if (this.fileCreated) {
                this.writeToFile(logLevel, message);
            } else {
                this.checkFileExists(false, (exists) => {
                    if (exists) {
                        this.writeToFile(logLevel, message);
                    }
                });
            }
        }
    }

    public setLogLevel(loglevel: LogLevel): void {
        this.logLevel = loglevel;
    }

    /**
     * Writes message with loglevel to a file.
     * 
     * @param logLevel The loglevel.
     * @param message The message.
     */
    private writeToFile(logLevel: LogLevel, message: string): void {
        if (this.logDebug === true || (this.logDebug === false && logLevel !== LogLevel.DEBUG)) {
            fileSystem.appendFile(this.path + this.fileName,
                new Date().toLocaleString() + " " + LogLevel.toString(logLevel) + ": " + message + "\n",
                (error: NodeJS.ErrnoException) => {
                    if (error) {
                        this.backupLogger.log(LogLevel.ERROR, "Could not write to file: " + this.path + this.fileName);
                        this.backupLogger.log(logLevel, message);
                    }
                });
        }
    }

    /**
     * Checks if a file exists and calls the callback with the result.
     *
     * @param create If trues creates the file if it doesnt exsist.
     * @param callback Callback that is called when the filelookup has been finished.
     */
    private checkFileExists(create: boolean, callback?: (exists: boolean) => void): void {
        fileSystem.exists(this.path + this.fileName, (exists: boolean) => {
            this.fileCreated = exists;
            if (callback) {
                callback(this.fileCreated);
            }
            if (!this.fileCreated && create) {
                fileSystem.writeFile(this.path + this.fileName, this.title + "\n", (error: NodeJS.ErrnoException) => {
                    if (!error) {
                        this.fileCreated = true;
                        this.backupLogger.log(LogLevel.DEBUG, "File created!");
                    } else {
                        this.backupLogger.log(LogLevel.ERROR, "Could not create file: " + this.path + this.fileName);
                    }
                });
            }
        });
    }

}