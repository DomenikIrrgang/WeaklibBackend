import { DatabaseRequestScheduler } from "./DatabaseRequestScheduler";
import { CreateCollection } from "./requests/CreateCollection";
import { CreateIndex } from "./requests/CreateIndex";
import { config } from "../config/Config";

export class DatabaseSetup {
    public init(): void {
        if (config.development) {
            let database: DatabaseRequestScheduler = new DatabaseRequestScheduler();
            this.initUser(database);
            this.initWeakaura(database);
            database.executeRequests();
        }
    }

    public initUser(database: DatabaseRequestScheduler): void {
        database.scheduleRequest(new CreateCollection("user", (result: any, error) => {
            if (!error) {
                database.scheduleRequest(new CreateIndex("user", { email: 1 }, { unique: true }));
                database.scheduleRequest(new CreateIndex("user", { name: 1 }, { unique: true }));
                database.executeRequests();
            }
        }));
    }

    public initWeakaura(database: DatabaseRequestScheduler): void {
        database.scheduleRequest(new CreateCollection("weakaura"));
    }


}