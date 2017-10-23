import { Controller } from "./Controller";
import { Request, Response } from "express";
import { DatabaseRequestScheduler } from "../database/DatabaseRequestScheduler";
import { FindAll } from "../database/requests/FindAll";
import { User } from "../database/models/User";

export class UserController implements Controller {
    public request(request: Request, response: Response): void {
        const database: DatabaseRequestScheduler = new DatabaseRequestScheduler();
        database.executeSingleRequest(new FindAll("user", this.getQuery(request), { password: 0 }, (result: User[], error) => {
            console.log(result);
            response.send(JSON.stringify(result));
        }));
    }

    private getQuery(request: Request): object {
        let query: object = {};
        if (request.query.name) {
            query["name"] = request.query.name;
        }
        return query;
    }
}