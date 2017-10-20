import * as express from "express";
import { Express } from "express";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import { config } from "./config/Config";
import { routes } from "./routes/Routes";

export class WeaklibBackend {
  public express: Express;

  constructor() {
    this.express = express();
    this.express.use(cookieParser());
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    this.express.use(session(config.session.init));
    this.mountRoutes();
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