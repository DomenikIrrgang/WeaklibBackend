import { Controller } from "./Controller";
import { Request, Response } from "express";

export class TestController implements Controller {
    public request(request: Request, response: Response): void {
        if (request.session.views) {
            request.session.views++;
            response.setHeader("Content-Type", "text/html");
            response.write("<p>views: " + request.session.views + "</p>");
            response.write("<p>expires in: " + (request.session.cookie.maxAge / 1000) + "s</p>");
            response.end();
          } else {
            request.session.views = 1;
            response.end("welcome to the session demo. refresh!");
          }
    }
}