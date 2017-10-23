import { DatabaseRequestScheduler } from "./DatabaseRequestScheduler";
import { CreateCollection } from "./requests/CreateCollection";
import { CreateIndex } from "./requests/CreateIndex";
import { InsertOne } from "./requests/InsertOne";
import { InsertMany } from "./requests/InsertMany";
import { config } from "../config/Config";
import { Weakaura } from "../database/models/Weakaura";
import { User } from "../database/models/User";
import { WeakauraCategory } from "../database/models/WeakauraCategory";

export class DatabaseSetup {
    public init(): void {
        if (config.development) {
            let database: DatabaseRequestScheduler = new DatabaseRequestScheduler();
            this.initUser(database);
            this.initWeakaura(database);
            this.initCategories(database);
            database.executeRequests();
        }
    }

    public initUser(database: DatabaseRequestScheduler): void {
        database.scheduleRequest(new CreateCollection("user", (result: any, error) => {
            if (!error) {
                let user: User = {
                    name: "Suu",
                    description: "Creator of Weaklib.com",
                    email: "domenikirrgang@web.de",
                    password: "123",
                    profilePicture: "https://media.wago.io/screenshots/BJK1Krrq-/1505216864352-Hoez.png",
                    created: Date.now(),
                }
                database.scheduleRequest(new CreateIndex("user", { email: 1 }, { unique: true }));
                database.scheduleRequest(new CreateIndex("user", { name: 1 }, { unique: true }));
                database.scheduleRequest(new InsertOne("user", user));
                database.executeRequests();
            }
        }));
    }

    public initWeakaura(database: DatabaseRequestScheduler): void {
        database.scheduleRequest(new CreateCollection("weakaura", (result: any, error) => {
            let weakaura: Weakaura[] = [
                {
                    name: "Test Weakaura",
                    description: "This is a testing weakaura!",
                    hash: "123xfaijkae",
                    user: "Suu",
                    views: 100,
                    versions: [
                        {
                            weakauraString: "asdasdadsdas",
                            version: 1,
                            changes: "Added some stuff"
                        }
                    ],
                    categories: [
                        "Warrior",
                        "Druid"
                    ],
                    images: [
                        {
                            url: "https://media.wago.io/screenshots/BJK1Krrq-/1505216864352-Hoez.png",
                            description: "This is a testing description",
                        }
                    ],
                    profilePicture: "https://media.wago.io/screenshots/BJK1Krrq-/1505216864352-Hoez.png",
                    created: Date.now(),
                    updated: Date.now()
                },
                {
                    name: "Archimonde Radar",
                    description: "This is a testing weakaura!",
                    hash: "123xfaijke",
                    user: "Suu",
                    views: 100,
                    versions: [
                        {
                            weakauraString: "asdasdadsdas",
                            version: 1,
                            changes: "Added some stuff"
                        },
                        {
                            weakauraString: "asdasdadsdas",
                            version: 2,
                            changes: "Added some stuff"
                        },
                        {
                            weakauraString: "asdasdadsdas",
                            version: 3,
                            changes: "Added some stuff"
                        }
                    ],
                    categories: [
                        "Deathknight",
                        "Druid"
                    ],
                    images: [
                        {
                            url: "https://media.wago.io/screenshots/BJK1Krrq-/1505216864352-Hoez.png",
                            description: "This is a testing description",
                        }
                    ],
                    profilePicture: "https://media.wago.io/screenshots/BJK1Krrq-/1505216864352-Hoez.png",
                    created: Date.now(),
                    updated: Date.now()
                }
            ];
            database.scheduleRequest(new InsertMany("weakaura", weakaura));
            database.scheduleRequest(new CreateIndex("weakaura", { hash: 1 }, { unique: true }));
            database.executeRequests();
        }));
    }

    private initCategories(database: DatabaseRequestScheduler): void {
        database.scheduleRequest(new CreateCollection("category", (result: any, error) => {
            if (!error) {
                let categories: WeakauraCategory[] = [
                    { name: "Warrior" },
                    { name: "Paladin" },
                    { name: "Deathknight" },
                    { name: "Druid" },
                ];
                database.scheduleRequest(new InsertMany("category", categories));
                database.scheduleRequest(new CreateIndex("category", { name: 1 }, { unique: true }));
                database.executeRequests();
            }
        }));
    }


}