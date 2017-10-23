import { Controller } from "./Controller";
import { Request, Response } from "express";

export class IsLoggedInController implements Controller {
    public request(request: Request, response: Response): void {
        response.send("{}");
    }
}