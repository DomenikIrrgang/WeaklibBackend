import { Db, MongoError } from "mongodb";
import { User } from "../../models/User";
import { InsertOne } from "../InsertOne";
import { config } from "../../../config/Config";
import * as bcrypt from "bcrypt";


export class CreateUser extends InsertOne {
    constructor(private user: User, callback?: (result: any, error: MongoError) => void) {
        super(config.database.collections.user, user, callback);
    }

    public execute(connection: Db) {
        bcrypt.hash(this.user.password, config.app.hashRound, (err: Error, hash: string) => {
            this.user.password = hash;
            super.execute(connection);
        });
    }
}
