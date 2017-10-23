import { Controller } from "./Controller";
import { Request, Response } from "express";
import { DatabaseRequestScheduler } from "../database/DatabaseRequestScheduler";
import { FindAll } from "../database/requests/FindAll";
import { Weakaura } from "../database/models/Weakaura";

export class GetWeakauraController implements Controller {
    public request(request: Request, response: Response): void {
        const database: DatabaseRequestScheduler = new DatabaseRequestScheduler();
        database.executeSingleRequest(new FindAll("weakaura", this.getQuery(request), {}, (result: Weakaura[], error) => {
            console.log(result);
            response.send(JSON.stringify(result));
        }));
    }

    private getQuery(request: Request): object {
        let query: object = {};
        if (request.query.name) {
            query["name"] = { $regex: ".*" + request.query.name + ".*", $options: "i" };
        }
        if (request.query.user) {
            query["user"] = { $regex: ".*" + request.query.user + ".*", $options: "i" };
        }
        if (request.query.categories) {
            query["categories"] = { $all: request.query.categories.split(",") };
        }
        if (request.query.hash) {
            query["hash"] = request.query.hash;
        }
        return query;
    }
}