import { Controller } from "./Controller";
import { Request, Response } from "express";
import { DatabaseRequestScheduler } from "../database/DatabaseRequestScheduler";
import { InsertOne } from "../database/requests/InsertOne";
import { MongoError } from "mongodb";

interface RegisterRequest {
    name: string;
    password: string;
    email: string;
    created: number;
}

export class RegisterController implements Controller {
    public request(request: Request, response: Response): void {
        let registerRequest: RegisterRequest = request.body;
        registerRequest.created = Date.now();
        if (registerRequest.password && registerRequest.name && registerRequest.email) {
            let emailCheck: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emailCheck.test(registerRequest.email)) {
                const database: DatabaseRequestScheduler = new DatabaseRequestScheduler();
                database.executeSingleRequest(new InsertOne("user", registerRequest, (result: any, error: MongoError) => {
                    if (error) {
                        if (error.message.indexOf("name") >= 0) {
                            response.send("ERROR name taken");
                            return;
                        }
                        if (error.message.indexOf("email") >= 0) {
                            response.send("ERROR email taken");
                            return;
                        }
                    } else {
                        response.send("SUCCESS");
                    }
                }));
            } else {
                response.send("ERROR email invalid");
            }
        } else {
            response.sendStatus(401);
        }
    }
}