import { Request, Response } from "express";

export interface Controller {
    request(request: Request, response: Response): void;
}