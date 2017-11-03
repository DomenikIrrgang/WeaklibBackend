import { DatabaseRequestScheduler } from "./DatabaseRequestScheduler";
import { CreateCollection } from "./requests/CreateCollection";
import { CreateIndex } from "./requests/CreateIndex";
import { InsertMany } from "./requests/InsertMany";
import { config } from "../config/Config";
import { Weakaura } from "../database/models/Weakaura";
import { User } from "../database/models/User";
import { WeakauraCategory } from "../database/models/WeakauraCategory";
import { DropDatabase } from "./requests/DropDatabase";
import * as connectMongo from "connect-mongo";
import * as session from "express-session";
import { CreateUser } from "./requests/user/InsertUser";

let MongoStore = connectMongo(session);

export class DatabaseSetup {
    private databaseRequestScheduler: DatabaseRequestScheduler;

    public init(callback: () => void) {
        if (config.database.initialized === false) {
            config.database.initialized = true;
            this.databaseRequestScheduler = new DatabaseRequestScheduler(null, () => {
                callback();
            });
            if (!config.database.clear) {
                this.initAll();
            } else {
                this.databaseRequestScheduler.scheduleRequest(new DropDatabase(() => {
                    this.initAll();
                    this.databaseRequestScheduler.executeRequests();
                }));
            }
            this.databaseRequestScheduler.executeRequests();
        } else {
            callback();
        }
    }

    private initAll(): void {
        this.initSession();
        this.initUser();
        this.initWeakaura();
        this.initCategories();
        this.initWeakauraComment();
    }

    private initNews(): void {
        
    }

    private initSession(): void {
        config.sessionconfig.options.store = new MongoStore({
            url: config.database.getUrl(),
            collection: config.database.collections.sessions,
        });
    }

    private initUser(): void {
        this.databaseRequestScheduler.scheduleRequest(new CreateCollection(config.database.collections.user, (result: any, error) => {
            if (!error) {
                let user: User = {
                    name: "Suu",
                    description: "Creator of Weaklib.com",
                    email: "domenikirrgang@web.de",
                    password: "123",
                    profilePicture: "https://media.wago.io/screenshots/BJK1Krrq-/1505216864352-Hoez.png",
                    created: Date.now(),
                };
                this.databaseRequestScheduler.scheduleRequest(new CreateIndex(config.database.collections.user, { email: 1 }, { unique: true }));
                this.databaseRequestScheduler.scheduleRequest(new CreateIndex(config.database.collections.user, { name: 1 }, { unique: true }));
                this.databaseRequestScheduler.scheduleRequest(new CreateUser(user));
                this.databaseRequestScheduler.executeRequests();
            }
        }));
    }

    private initWeakaura(): void {
        this.databaseRequestScheduler.scheduleRequest(new CreateCollection(config.database.collections.weakaura, (result: any, error) => {
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
                            version: "1",
                            changes: "Added some stuff",
                        },
                    ],
                    categories: [
                        "Warrior",
                        "Druid",
                    ],
                    images: [
                        {
                            url: "https://media.wago.io/screenshots/BJK1Krrq-/1505216864352-Hoez.png",
                            description: "This is a testing description",
                        },
                    ],
                    profilePicture: "https://media.wago.io/screenshots/BJK1Krrq-/1505216864352-Hoez.png",
                    created: Date.now(),
                    updated: Date.now(),
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
                            version: "1",
                            changes: "Added some stuff",
                        },
                        {
                            weakauraString: "asdasdadsdas",
                            version: "2",
                            changes: "Added some stuff",
                        },
                        {
                            weakauraString: "asdasdadsdas",
                            version: "3",
                            changes: "Added some stuff",
                        },
                    ],
                    categories: [
                        "Deathknight",
                        "Druid",
                    ],
                    images: [
                        {
                            url: "https://media.wago.io/screenshots/BJK1Krrq-/1505216864352-Hoez.png",
                            description: "This is a testing description",
                        },
                    ],
                    profilePicture: "https://media.wago.io/screenshots/BJK1Krrq-/1505216864352-Hoez.png",
                    created: Date.now(),
                    updated: Date.now(),
                },
            ];
            this.databaseRequestScheduler.scheduleRequest(new InsertMany(config.database.collections.weakaura, weakaura));
            this.databaseRequestScheduler.scheduleRequest(new CreateIndex(config.database.collections.weakaura, { hash: 1 }, { unique: true }));
            this.databaseRequestScheduler.executeRequests();
        }));
    }

    private initCategories(): void {
        this.databaseRequestScheduler.scheduleRequest(new CreateCollection(config.database.collections.category, (result: any, error) => {
            if (!error) {
                let categories: WeakauraCategory[] = [
                    { name: "Mage" },
                    { name: "Priest" },
                    { name: "Warlock" },
                    { name: "Rogue" },
                    { name: "Druid" },
                    { name: "Monk" },
                    { name: "Demonhunter" },
                    { name: "Shaman" },
                    { name: "Hunter" },
                    { name: "Warrior" },
                    { name: "Paladin" },
                    { name: "Deathknight" },
                    { name: "PvE" },
                    { name: "PvP" },
                    { name: "Raid" },
                    { name: "Dungeon" },
                    { name: "ToS" },
                ];
                this.databaseRequestScheduler.scheduleRequest(new InsertMany(config.database.collections.category, categories));
                this.databaseRequestScheduler.scheduleRequest(new CreateIndex(config.database.collections.category, { name: 1 }, { unique: true }));
                this.databaseRequestScheduler.executeRequests();
            }
        }));
    }

    private initWeakauraComment(): void {
        this.databaseRequestScheduler.scheduleRequest(new CreateCollection(config.database.collections.weakauracomment));
    }

}