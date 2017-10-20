import { Controller } from "./Controller";
import { Request, Response } from "express";

export class LoginController implements Controller {
    public request(request: Request, response: Response): void {
        if (!request.session.user) {
            request.session.user = { name: "Domenik" };
            response.send("logged in");
        } else {
            response.send("already logged in");
        }
    }
}