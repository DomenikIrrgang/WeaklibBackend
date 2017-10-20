import { Request, Response } from "express";

export interface Middleware {
    check(request: Request, response: Response): boolean;
}