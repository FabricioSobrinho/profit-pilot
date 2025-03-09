import { Request, Response } from "express";
export declare class TentsController {
    index(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getTent(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
