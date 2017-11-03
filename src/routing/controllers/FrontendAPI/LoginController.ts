import { Controller } from "../../Controller";
import { Request, Response } from "express";
import { DatabaseRequestScheduler } from "../../../database/DatabaseRequestScheduler";
import { FindOne } from "../../../database/requests/FindOne";
import { User } from "../../../database/models/User";
import * as bcrypt from "bcrypt";
import { config } from "../../../config/Config";

interface LoginRequest {
    name: string;
    password: string;
}

export class LoginController implements Controller {
    public onRequest(request: Request, response: Response): void {
        let loginRequest: LoginRequest = request.query;
        if (loginRequest.password && loginRequest.name) {
            const database: DatabaseRequestScheduler = new DatabaseRequestScheduler();
            database.executeSingleRequest(new FindOne(config.database.collections.user, { name: loginRequest.name }, {}, (result: User, error) => {
                if (error) {
                    response.sendStatus(401);
                } else {
                    bcrypt.compare(loginRequest.password, result.password, (bcryptError: Error, same: boolean) => {
                        if (same) {
                            delete result.password;
                            request.session.user = result;
                            response.sendStatus(200);
                        } else {
                            response.sendStatus(401);
                        }
                    });
                }
            }));
        } else {
            response.sendStatus(401);
        }
    }
}