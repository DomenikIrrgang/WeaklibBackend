import * as express from "express";
import { Express } from "express";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as cors from "cors";
import { config } from "./config/Config";
import * as bodyParser from "body-parser";
import { DatabaseSetup } from "./database/DatabaseSetup";
import { WeaklibRouter } from "./routing/WeaklibRouter";
import { RouterConfig } from "./routing/RouterConfig";
import { FrontendAPI } from "./routing/routerconfigs/FrontendAPI";

let routerConfigurations: RouterConfig[] = [
  new FrontendAPI(""),
];

export class WeaklibBackend {
  public express: Express;
  private weaklibRouter: WeaklibRouter;

  public init(callback?: () => void) {
    this.express = express();
    this.initLibraries();
    this.mountRoutes();
    this.initDatabase(callback);
  }

  private initLibraries(): void {
    this.express.use(cookieParser());
    this.express.use(session(config.sessionconfig.options));
    this.express.use(bodyParser.json());
    this.express.use(cors({
      origin: (origin, callback) => {
          let isWhitelisted = config.app.originWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
      },
      credentials: true,
    }));
  }

  private initDatabase(callback: () => void) {
    let databaseSetup: DatabaseSetup = new DatabaseSetup();
    databaseSetup.init(callback);
  }

  private mountRoutes(): void {
    this.weaklibRouter = new WeaklibRouter(this.express);
    for (let routerConfig of routerConfigurations) {
      this.weaklibRouter.applyRouterConfig(routerConfig);
    }
  }
}