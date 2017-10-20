import { Controller } from "./Controller";
import { Request, Response } from "express";
import { DatabaseRequestScheduler } from "../database/DatabaseRequestScheduler";
import { InsertOne } from "../database/requests/InsertOne";

interface RegisterRequest {
    name: string;
    password: string;
}

export class RegisterController implements Controller {
    public request(request: Request, response: Response): void {
        let registerRequest: RegisterRequest = request.body;
        if (registerRequest.password && registerRequest.name) {
            const database: DatabaseRequestScheduler = new DatabaseRequestScheduler();
            database.executeSingleRequest(new InsertOne("user", registerRequest, (result: any, error) => {
                if (error) {
                    response.sendStatus(401);
                } else {
                    response.sendStatus(200);
                }
            }));
        } else {
            response.sendStatus(401);
        }
    }
}