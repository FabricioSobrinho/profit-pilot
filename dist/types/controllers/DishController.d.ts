import { Request, Response } from "express";
export declare class DishController {
    getDishs(req: Request, res: Response): Promise<void>;
    newDish(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateDish(req: Request, res: Response): Promise<void>;
    deleteDish(req: Request, res: Response): Promise<void>;
}
