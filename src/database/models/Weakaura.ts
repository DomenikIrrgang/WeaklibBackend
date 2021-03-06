import { WeakauraVersion } from "./WeakauraVersion";
import { WeakauraPicture } from "./WeakauraPicture";

export class Weakaura {
    public name: string;
    public hash: string;
    public profilePicture: string;
    public description: string;
    public views: number;
    public user: string;
    public categories: string[];
    public versions: WeakauraVersion[];
    public images: WeakauraPicture[];
    public created: number;
    public updated: number;
}