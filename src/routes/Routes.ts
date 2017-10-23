import { Route } from "./Route";
import { Authenticated } from "../middleware/Authenticated";
import { Middleware } from "../middleware/Middleware";

import { TestController } from "../controller/TestController";
import { LoginController } from "../controller/LoginController";
import { LogoutController } from "../controller/LogoutController";
import { RegisterController } from "../controller/RegisterController";
import { IsLoggedInController } from "../controller/IsLoggedInController";
import { GetWeakauraController } from "../controller/GetWeakauraController";
import { CategoriesController } from "../controller/CategoriesController";
import { GetWeakauraCommentController } from "../controller/GetWeakauraCommentController";
import { PostCommentController } from "../controller/PostCommentController";
import { UserController } from "../controller/UserController";
import { AllowCrossOrigin } from "../middleware/AllowCrossOrigin";

let authenticated: Middleware = new Authenticated();
let crossOrigin: Middleware = new AllowCrossOrigin();

export let routes: Route[] = [
    new Route("GET", "/test", new TestController()).middleware(authenticated),
    new Route("POST", "/login", new LoginController()).middleware(crossOrigin),
    new Route("POST", "/logout", new LogoutController()).middleware(crossOrigin),
    new Route("POST", "/register", new RegisterController()).middleware(crossOrigin),
    new Route("GET", "/isloggedin", new IsLoggedInController()).middleware(crossOrigin),
    new Route("GET", "/weakaura", new GetWeakauraController()).middleware(crossOrigin),
    new Route("GET", "/categories", new CategoriesController()).middleware(crossOrigin),
    new Route("GET", "/user", new UserController()).middleware(crossOrigin),
    new Route("GET", "/weakauracomment", new GetWeakauraCommentController()).middleware(crossOrigin),
    new Route("POST", "/weakauracomment", new PostCommentController()).middleware(crossOrigin).middleware(authenticated),
];