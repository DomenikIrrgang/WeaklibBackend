import { Express, Router, Request, Response, NextFunction } from "express";
import * as expressLib from "express";
import { RouterConfig } from "./RouterConfig";
import { Route } from "./Route";

/**
 * Handles the different routing configurations of the backend.
 */
export class WeaklibRouter {
    private express: Express;

    /**
     * Creates a new ContrailRouter.
     *
     * @param express Reference to the Express intance used for the backend application.
     */
    constructor(express: Express) {
        this.express = express;
    }

    /**
     * Applies a RouterConfig to the router and automatically mounts all routes issued.
     *
     * @param routerConfig The router config that will get applied.
     */
    public applyRouterConfig(routerConfig: RouterConfig): void {
        let router: Router = expressLib.Router();
        for (let route of routerConfig.getRoutes()) {
            this.mountRoute(router, route);
        }
        this.express.use(routerConfig.getBasePath(), router);
    }

    private mountRoute(router: Router, route: Route): void {
        switch (route.getMethod()) {
            case "GET": {
                this.mountGet(router, route);
                break;
            }
            case "POST": {
                this.mountPost(router, route);
                break;
            }
            case "PUT": {
                this.mountPut(router, route);
                break;
            }
            case "DELETE": {
                this.mountDelete(router, route);
                break;
            }
        }
    }

    private mountGet(router: Router, route: Route): void {
        router.get(route.getPath(),
            (request: Request, response: Response, nextFunction: NextFunction) => {
                this.handleMiddleware(route, request, response, nextFunction);
            }, (request: Request, response: Response) => {
                route.getController().onRequest(request, response);
            });
    }

    private mountPut(router: Router, route: Route): void {
        router.put(route.getPath(),
            (request: Request, response: Response, nextFunction: NextFunction) => {
                this.handleMiddleware(route, request, response, nextFunction);
            }, (request: Request, response: Response) => {
                route.getController().onRequest(request, response);
            });
    }

    private mountPost(router: Router, route: Route): void {
        router.post(route.getPath(),
            (request: Request, response: Response, nextFunction: NextFunction) => {
                this.handleMiddleware(route, request, response, nextFunction);
            }, (request: Request, response: Response) => {
                route.getController().onRequest(request, response);
            });
    }

    private mountDelete(router: Router, route: Route): void {
        router.delete(route.getPath(),
            (request: Request, response: Response, nextFunction: NextFunction) => {
                this.handleMiddleware(route, request, response, nextFunction);
            }, (request: Request, response: Response) => {
                route.getController().onRequest(request, response);
            });
    }

    private handleMiddleware(route: Route, request: Request, response: Response, next: NextFunction) {
        for (let middleware of route.getMiddlewares()) {
            if (!middleware.onRequest(request, response)) {
                return;
            }
        }
        next();
    }
}