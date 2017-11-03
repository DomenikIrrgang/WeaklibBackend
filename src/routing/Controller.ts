import { Request, Response } from "express";

/**
 * Represents the endpoint of a request. Corelogic like send a JSON response for an API should be handled here.
 */
export interface Controller {
    /**
     * Is invoked if a request passes all middlewares applied to a route.
     *
     * @param request The incoming request.
     * @param response The outgoing response.
     */
    onRequest(request: Request, response: Response): void;
}