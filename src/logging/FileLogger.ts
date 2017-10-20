import { Logger } from "./Logger";
import { LogLevel } from "./LogLevel";
import { ConsoleLogger } from "./ConsoleLogger";
import { developmentEnvironment } from "../config/Globals";
import * as fileSystem from "fs";

export class FileLogger implements Logger {

    private fileCreated: boolean = false;
    private path: string = "./logs/";
    private backupLogger: Logger = new ConsoleLogger();
    private logDebug: boolean;

    constructor(private title: string, private fileName: string, logDebug?: boolean, path?: string) {
        if (path) {
            this.path = path;
        }
        if (logDebug) {
            this.logDebug = logDebug;
            this.backupLogger = new ConsoleLogger(logDebug);
        } else {
            this.logDebug = developmentEnvironment;
        }
        this.checkFileExists(true);
    }

    public log(logLevel: LogLevel, message: string) {
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

    private writeToFile(logLevel: LogLevel, message: string) {
        if (this.logDebug === true || (this.logDebug === false && logLevel !== LogLevel.DEBUG)) {
            fileSystem.appendFile(this.path + this.fileName,
                new Date().toLocaleString() + " " + logLevel + ": " + message + "\n",
                (error: NodeJS.ErrnoException) => {
                    if (error) {
                        this.backupLogger.log(LogLevel.ERROR, "Could not write to file: " + this.path + this.fileName);
                        this.backupLogger.log(logLevel, message);
                    }
                });
        }
    }

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