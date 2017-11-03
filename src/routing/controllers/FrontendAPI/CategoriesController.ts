import { Controller } from "../../Controller";
import { Request, Response } from "express";
import { DatabaseRequestScheduler } from "../../../database/DatabaseRequestScheduler";
import { FindAll } from "../../../database/requests/FindAll";
import { WeakauraCategory } from "../../../database/models/WeakauraCategory";
import { config } from "../../../config/Config";

export class CategoriesController implements Controller {
    public onRequest(request: Request, response: Response): void {
        const database: DatabaseRequestScheduler = new DatabaseRequestScheduler();
        database.executeSingleRequest(new FindAll(config.database.collections.category, {}, {}, (result: WeakauraCategory[], error) => {
            response.send(JSON.stringify(result));
        }));
    }
}