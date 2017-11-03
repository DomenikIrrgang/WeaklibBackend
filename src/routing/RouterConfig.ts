import { Route } from "./Route";

export abstract class RouterConfig {
    /**
     * Path under which all sub routes are going to get mounted.
     */
    private basePath: string;

    /**
     * Routes of the configuration that are going to get mounted.
     */
    private routes: Route[] = [];

    constructor(basePath: string) {
        this.basePath = basePath;
    }

    /**
     * Adds a Route to the configuration.
     *
     * @param route Route that is going to get added.
     */
    public addRoute(route: Route): void {
        this.routes.push(route);
    }

    /**
     * Returns all routes that have been added to the configuration.
     *
     * @returns All routes of the configuration.
     */
    public getRoutes(): Route[] {
        return this.routes;
    }

    /**
     * Returns the base path of the configuration.
     *
     * @returns The basePath.
     */
    public getBasePath(): string {
        return this.basePath;
    }

}