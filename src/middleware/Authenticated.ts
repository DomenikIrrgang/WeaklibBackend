import { Middleware } from "./Middleware";
import { Request, Response } from "express";

export class Authenticated implements Middleware {
    public check(request: Request, response: Response): boolean {
        if (request.session.user) {
            return true;
        }
        response.sendStatus(401);
        return false;
    }
}