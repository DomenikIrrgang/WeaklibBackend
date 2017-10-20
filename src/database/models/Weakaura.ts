import { WeakauraVersion } from "./WeakauraVersion";

export class Weakaura {
    public name: string;
    public hash: string;
    public profilePicture: string;
    public description: string;
    public views: number;
    public userId: any;
    public categories: string[];
    public versions: WeakauraVersion[];
}