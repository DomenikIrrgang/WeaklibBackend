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
            request.query.comment = request.query.comment.substring(0, 1000);
            const database: DatabaseRequestScheduler = new DatabaseRequestScheduler();
            if (request.query.hash && request.query.root && request.query.id) {
                database.scheduleRequest(
                    new FindOne("weakauracomment", { _id: new ObjectID(request.query.root) }, {}, (result: WeakauraComment, error) => {
                        if (!error) {
                            let comment: WeakauraComment;
                            if (result._id.toHexString().toString() === request.query.id) {
                                comment = result;
                            } else {
                                comment = this.findComment(request.query.id, result.comments);
                            }
                            database.scheduleRequest(
                                new FindOne("weakaura", { hash: request.query.hash }, {}, (weakaura) => {
                                    comment.comments.push({
                                        _id: new ObjectID(),
                                        created: Date.now(),
                                        hash: request.query.hash,
                                        text: request.query.comment,
                                        user: request.session.user.name,
                                        comments: [],
                                        version: weakaura.versions.reverse()[0].version,
                                    });
                                    database.scheduleRequest(
                                        new UpdateOne("weakauracomment", { _id: new ObjectID(request.query.root) }, result,
                                            () => {
                                                response.send("SUCCESS");
                                            }));
                                    database.executeRequests();
                                }));
                            database.executeRequests();
                        } else {
                            response.send(401);
                        }
                    }));
                database.executeRequests();
            } else {
                if (request.query.hash) {
                    database.scheduleRequest(
                        new FindOne("weakaura", { hash: request.query.hash }, {}, (weakaura) => {
                            let comment: WeakauraComment = {
                                _id: new ObjectID(),
                                comments: [],
                                version: weakaura.versions.reverse()[0].version,
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
                        }));
                    database.executeRequests();
                } else {
                    response.sendStatus(401);
                }
            }
        } else {
            response.sendStatus(401);
        }

    }

    private findComment(id: string, comments: WeakauraComment[]): WeakauraComment {
        for (let subComment of comments) {
            if (subComment["_id"].toString() === id) {
                return subComment;
            }
            let tmp = this.findComment(id, subComment.comments);
            if (tmp !== null) {
                return tmp;
            }
        }
        return null;
    }
}