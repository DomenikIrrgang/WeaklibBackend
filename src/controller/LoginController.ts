import { Controller } from "./Controller";
import { Request, Response } from "express";
import { DatabaseRequestScheduler } from "../database/DatabaseRequestScheduler";
import { FindOne } from "../database/requests/FindOne";
import { User } from "../database/models/User";

interface LoginRequest {
    name: string;
    password: string;
}

export class LoginController implements Controller {
    public request(request: Request, response: Response): void {
        let loginRequest: LoginRequest = request.query;
        if (loginRequest.password && loginRequest.name) {
            const database: DatabaseRequestScheduler = new DatabaseRequestScheduler();
            database.executeSingleRequest(new FindOne("user", { name: loginRequest.name }, {}, (result: User, error) => {
                if (error) {
                    response.sendStatus(401);
                } else {
                    if (result && result.password === loginRequest.password) {
                        request.session.user = result;
                        response.send("SUCCESS");
                    } else {
                        response.send("ERROR");
                    }
                }
            }));
        } else {
            response.send("ERROR");
        }
    }
}