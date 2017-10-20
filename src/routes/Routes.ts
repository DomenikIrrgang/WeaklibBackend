import { Route } from "./Route";
import { TestController } from "../controller/TestController";
import { LoginController } from "../controller/LoginController";
import { LogoutController} from "../controller/LogoutController";
import { Authenticated } from "../middleware/Authenticated";
import { Middleware } from "../middleware/Middleware";

let authenticated: Middleware = new Authenticated();

export let routes: Route[] = [
    new Route("GET", "/test", new TestController()).middleware(authenticated),
    new Route("GET", "/login", new LoginController()),
    new Route("GET", "/logout", new LogoutController()),
];
