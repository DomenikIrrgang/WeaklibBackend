import { ObjectID } from "mongodb";

export class WeakauraComment {
    // tslint:disable-next-line:variable-name
    public _id: ObjectID;
    public text: string;
    public user: string;
    public hash: string;
    public version: string;
    public created: number;
    public comments: WeakauraComment[];
}