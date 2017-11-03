import { RouterConfig } from "../RouterConfig";
import { Route } from "../Route";
import { Middleware } from "../Middleware";
import { Authenticated } from "../middlewares/Authenticated";
import { AllowCrossOrigin } from "../middlewares/AllowCrossOrigin";
import { TestController } from "../controllers/FrontendAPI/TestController";
import { LoginController } from "../controllers/FrontendAPI/LoginController";
import { LogoutController } from "../controllers/FrontendAPI/LogoutController";
import { RegisterController } from "../controllers/FrontendAPI/RegisterController";
import { GetWeakauraController } from "../controllers/FrontendAPI/GetWeakauraController";
import { IsLoggedInController } from "../controllers/FrontendAPI/IsLoggedInController";
import { CategoriesController } from "../controllers/FrontendAPI/CategoriesController";
import { GetWeakauraCommentController } from "../controllers/FrontendAPI/GetWeakauraCommentController";
import { PostCommentController } from "../controllers/FrontendAPI/PostCommentController";
import { UserController } from "../controllers/FrontendAPI/UserController";


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

/**
 * Defines routes of the frontend API.
 */
export class FrontendAPI extends RouterConfig {

    constructor(baseURL: string) {
        super(baseURL);
        for (let route of routes) {
            this.addRoute(route);
        }
    }
}