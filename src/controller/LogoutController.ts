import { Controller } from "./Controller";
import { Request, Response } from "express";

export class LogoutController implements Controller {
    public request(request: Request, response: Response): void {
        if (request.session.user) {
            request.session.user = null;
            response.send("logged out");
        } else {
            response.send("already logged out");
        }
    }
}