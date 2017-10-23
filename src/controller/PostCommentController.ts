import { Controller } from "./Controller";
import { Request, Response } from "express";
import { DatabaseRequestScheduler } from "../database/DatabaseRequestScheduler";
import { InsertOne } from "../database/requests/InsertOne";
import { UpdateOne } from "../database/requests/UpdateOne";
import { FindOne } from "../database/requests/FindOne";
import { WeakauraComment } from "../database/models/WeakauraComment";
import { ObjectID } from "mongodb";

export class PostCommentController implements Controller {
    public request(request: Request, response: Response): void {
        if (request.query.comment) {
            const database: DatabaseRequestScheduler = new DatabaseRequestScheduler();
            if (request.query.hash && request.query.root) {
                database.scheduleRequest(new FindOne("weakauracomment", { "_id": new ObjectID(request.query.root) }, {}, (result: WeakauraComment, error) => {
                    if (!error) {
                        result.comments.push({
                            _id: new ObjectID(),
                            root: request.query.root,
                            comments: [],
                            created: Date.now(),
                            hash: request.query.hash,
                            text: request.query.comment,
                            user: request.session.user.name
                        });
                        database.scheduleRequest(new UpdateOne("weakauracomment", { "comments._id": new ObjectID(request.query.root) }, result, (result: any, error) => {
                            response.send("SUCCESS");
                        }));
                        database.executeRequests();
                    } else {
                        response.send(401);
                    }
                }));
                database.executeRequests();
            } else {
                if (request.query.hash) {
                    let comment: WeakauraComment = {
                        _id: new ObjectID(),
                        root: "",
                        comments: [],
                        created: Date.now(),
                        hash: request.query.hash,
                        text: request.query.comment,
                        user: request.session.user.name,
                    };
                    database.executeSingleRequest(new InsertOne("weakauracomment", comment, (result: any, error) => {
                        if (!error) {
                            response.send("SUCCESS");
                        }
                    }));
                } else {
                    response.sendStatus(401);
                }
            }
        } else {
            response.sendStatus(401);
        }

    }

    /*
    private findComment(id: string, comments: WeakauraComment[]): WeakauraComment {
        for (let subComment of comments) {
            if (subComment["_id"].toString() == id) {
                return subComment;
            }
            let tmp = this.findComment(id, subComment.comments);
            if (tmp !== null) {
                return tmp
            }
        }
        return null;
    }*/
}