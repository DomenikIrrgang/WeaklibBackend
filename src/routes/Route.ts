import { Controller } from "../controller/Controller";
import { Router, NextFunction, Request, Response } from "express";
import { Middleware } from "../middleware/Middleware";

export class Route {
    private uri: string;
    private controller: Controller;
    private type: string;
    private middlewares: Middleware[] = [];

    constructor(type: string, uri: string, controller: Controller) {
        this.type = type;
        this.uri = uri;
        this.controller = controller;
    }

    public middleware(middleware: Middleware): Route {
        this.middlewares.push(middleware);
        return this;
    }

    public mount(router: Router) {
        switch (this.type) {
            case "GET": {
                this.get(router);
                break;
            }
            case "PUT": {
                this.put(router);
                break;
            }
            case "POST": {
                this.post(router);
                break;
            }
            case "DELETE": {
                this.delete(router);
                break;
            }
        }
    }

    private get(router: Router) {
        router.get(this.uri,
            (request: Request, response: Response, nextFunction: NextFunction) => {
                this.handleMiddleware(request, response, nextFunction);
            }, (request: Request, response: Response) => {
                this.controller.request(request, response);
            });
    }

    private post(router: Router) {
        router.post(this.uri,
            (request: Request, response: Response, nextFunction: NextFunction) => {
                this.handleMiddleware(request, response, nextFunction);
            }, (request: Request, response: Response) => {
                this.controller.request(request, response);
            });
    }

    private put(router: Router) {
        router.put(this.uri,
            (request: Request, response: Response, nextFunction: NextFunction) => {
                this.handleMiddleware(request, response, nextFunction);
            }, (request: Request, response: Response) => {
                this.controller.request(request, response);
            });
    }

    private delete(router: Router) {
        router.delete(this.uri,
            (request: Request, response: Response, nextFunction: NextFunction) => {
                this.handleMiddleware(request, response, nextFunction);
            }, (request: Request, response: Response) => {
                this.controller.request(request, response);
            });
    }

    private handleMiddleware(request: Request, response: Response, next: NextFunction) {
        for (let middleware of this.middlewares) {
            if (!middleware.check(request, response)) {
                return;
            }
        }
        next();
    }
}
