import { Middleware } from "./Middleware";
import { Request, Response } from "express";

export class AllowCrossOrigin implements Middleware {
    public check(request: Request, response: Response): boolean {
        console.log(request);
        response.header("Access-Control-Allow-Origin", "http://localhost:4200");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        response.header("Access-Control-Allow-Credentials", "true");
        response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        response.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
        return true;
    }
} 