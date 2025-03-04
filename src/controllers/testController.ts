
import { Request, Response } from "express";

export function test(req: Request, res: Response) {

    res.send("wesh");
}

export function test2(req: Request, res: Response) {
    res.send(req.body);
}

export function protectedTest(req: Request, res: Response) {
    //req.headers.user a été ajouté par le middleware verifyTokenMiddleware et contient
    //les données décryptées du token
    const decodeUser = JSON.parse(req.headers.user as string);
    res.send(decodeUser)
}