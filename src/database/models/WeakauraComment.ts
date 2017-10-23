import { ObjectID } from "mongodb";

export class WeakauraComment {
    public _id: ObjectID;
    public root: string;
    public text: string;
    public user: string;
    public hash: string;
    public created: number;
    public comments: WeakauraComment[];
}