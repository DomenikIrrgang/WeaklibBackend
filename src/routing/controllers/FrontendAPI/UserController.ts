import { Controller } from "../../Controller";
import { Request, Response } from "express";
import { DatabaseRequestScheduler } from "../../../database/DatabaseRequestScheduler";
import { FindAll } from "../../../database/requests/FindAll";
import { User } from "../../../database/models/User";
import { config } from "../../../config/Config";

export class UserController implements Controller {
    public onRequest(request: Request, response: Response): void {
        const database: DatabaseRequestScheduler = new DatabaseRequestScheduler();
        database.executeSingleRequest(new FindAll(config.database.collections.user, this.getQuery(request), { password: 0 }, (result: User[], error) => {
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