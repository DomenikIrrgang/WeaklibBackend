import { Controller } from "../../Controller";
import { Request, Response } from "express";
import { DatabaseRequestScheduler } from "../../../database/DatabaseRequestScheduler";
import { FindAll } from "../../../database/requests/FindAll";
import { FindOne } from "../../../database/requests/FindOne";
import { config } from "../../../config/Config";

interface Comment {
    text: string;
    user: object;
    hash: string;
    version: string;
    created: number;
    comments: Comment[];
}

export class GetWeakauraCommentController implements Controller {
    public onRequest(request: Request, response: Response): void {
        let result: Comment[] = [];
        const database: DatabaseRequestScheduler = new DatabaseRequestScheduler(null, () => {
            response.send(JSON.stringify(result));
        });
        database.scheduleRequest(new FindAll(config.database.collections.weakauracomment, this.getQuery(request), {}, (comments: Comment[], error) => {
            result = comments;
            this.findUser(database, result);
        }));
        database.executeRequests();
    }

    private findUser(database: DatabaseRequestScheduler, comments: Comment[]) {
        for (let comment of comments) {
            database.scheduleRequest(new FindOne(config.database.collections.user, { name: comment.user }, {}, (user) => {
                comment.user = {};
                comment.user["name"] = user.name;
                comment.user["profilePicture"] = user.profilePicture;
                this.findUser(database, comment.comments);
            }));
            database.executeRequests();
        }
    }

    private getQuery(request: Request): object {
        let query: object = {};
        if (request.query.hash) {
            query["hash"] = request.query.hash;
        }
        return query;
    }
}