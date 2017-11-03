import { Controller } from "../../Controller";
import { Request, Response } from "express";

export class IsLoggedInController implements Controller {
    public onRequest(request: Request, response: Response): void {
        if (request.session.user) {
            response.send(request.session.user);
        } else {
            response.sendStatus(401);
        }
    }
}