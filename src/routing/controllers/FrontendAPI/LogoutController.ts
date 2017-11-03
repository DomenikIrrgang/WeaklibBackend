import { Controller } from "../../Controller";
import { Request, Response } from "express";

export class LogoutController implements Controller {
    public onRequest(request: Request, response: Response): void {
        if (request.session.user) {
            request.session.user = null;
            response.sendStatus(200);
        } else {
            response.sendStatus(401);
        }
    }
}