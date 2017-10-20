import { Route } from "./Route";
import { TestController } from "../controller/TestController";
import { LoginController } from "../controller/LoginController";
import { LogoutController } from "../controller/LogoutController";
import { RegisterController } from "../controller/RegisterController";
import { Authenticated } from "../middleware/Authenticated";
import { Middleware } from "../middleware/Middleware";

let authenticated: Middleware = new Authenticated();

export let routes: Route[] = [
    new Route("GET", "/test", new TestController()).middleware(authenticated),
    new Route("POST", "/login", new LoginController()),
    new Route("POST", "/logout", new LogoutController()),
    new Route("POST", "/register", new RegisterController()),
];
