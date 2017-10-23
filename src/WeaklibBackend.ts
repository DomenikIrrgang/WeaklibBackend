import * as express from "express";
import { Express } from "express";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as cors from "cors";
import { config } from "./config/Config";
import { routes } from "./routes/Routes";
import * as bodyParser from "body-parser";
import { DatabaseSetup } from "./database/DatabaseSetup";

export class WeaklibBackend {
  public express: Express;

  constructor() {
    this.express = express();
    this.initLibraries();
    this.mountRoutes();
    this.initDatabase();
  }

  private initLibraries(): void {
    this.express.use(cookieParser());
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    this.express.use(session(config.session.init));
    this.express.use(bodyParser.json());
    this.express.use(cors({
      origin: function(origin, callback) {
          let isWhitelisted = config.app.originWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
      },
      credentials: true,
      
    }));
  }

  private initDatabase(): void {
    let database: DatabaseSetup = new DatabaseSetup();
    database.init();
  }

  private mountRoutes(): void {
    const router = express.Router();
    for (const route of routes) {
      route.mount(router);
    }
    this.express.use("/", router);
  }
}

export default new WeaklibBackend().express;