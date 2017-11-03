import * as https from "https";
import { config } from "../config/Config";
import { LogLevel } from "../logging/LogLevel";
import { OutgoingHttpHeaders } from "http";

/**
 * Basic HTTPS Request with logging included.
 */
export class HttpsRequest {

    private type: string;
    private host: string;
    private path: string;

    constructor(host: string, path: string, type: string) {
        this.host = host;
        this.path = path;
        this.type = type;
    }

    public toPromise(requestHeader?: OutgoingHttpHeaders, data?: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const requestOptions: https.RequestOptions = {
                host: this.host,
                port: 443,
                path: this.path,
                method: this.type,
                headers: requestHeader,
            };

            const httpsrequest: https.ClientRequest = https.request(requestOptions, (httpResponse: https.IncomingMessage) => {
                let body: string = "";
                config.app.logger.log(LogLevel.SUCCESS, "response received " + this.type + " " + this.host + this.path);
                httpResponse.on("data", (chunk: string | Buffer) => {
                  body += chunk;
                });
                httpResponse.on("end", () => {
                    body = body.toString();
                    resolve(body);
                });
            });

            httpsrequest.on("error", (error: Error) => {
                config.app.logger.log(LogLevel.ERROR, error.message);
                reject(error);
            });

            if (data) {
                httpsrequest.write(data);
            }
            httpsrequest.end();
        });
    }

}