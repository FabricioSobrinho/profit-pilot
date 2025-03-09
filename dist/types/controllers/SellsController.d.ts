import { Request, Response } from "express";
export declare class SellsController {
    Index(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    newSell(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
