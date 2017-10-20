import { HttpsRequest } from "./HttpsRequest";
import * as QueryString from "query-string";
import { OAuth2Authentication } from "./OAuth2Authentication";

export class OAuth2Authenticator extends HttpsRequest {

    private authentication: OAuth2Authentication;

    constructor(authentication: OAuth2Authentication) {
        super(authentication.host, authentication.path, "POST");
        this.authentication = authentication;
    }

    public toPromise(): Promise<string> {
        const content: string = QueryString.stringify({
            grant_type: "password",
            username: this.authentication.username,
            password: this.authentication.password,
        });
        return super.toPromise({
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(content),
            "Authorization": this.authentication.secret,
        }, content);
    }
}