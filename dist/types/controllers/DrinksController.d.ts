import { Request, Response } from "express";
export declare class DrinksController {
    index(req: Request, res: Response): Promise<void>;
    newDrink(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
