import { Controller } from "./Controller";
import { Request, Response } from "express";
import { DatabaseRequestScheduler } from "../database/DatabaseRequestScheduler";
import { FindAll } from "../database/requests/FindAll";
import { WeakauraCategory } from "../database/models/WeakauraCategory";

export class CategoriesController implements Controller {
    public request(request: Request, response: Response): void {
        const database: DatabaseRequestScheduler = new DatabaseRequestScheduler();
        database.executeSingleRequest(new FindAll("category", {}, {}, (result: WeakauraCategory[], error) => {
            response.send(JSON.stringify(result));
        }));
    }
}