import { Request, Response } from "express";
export declare class ReportController {
    getAllSells(req: Request, res: Response): Promise<void>;
    todaySoFarSells(req: Request, res: Response): Promise<void>;
    sellsByDish(req: Request, res: Response): Promise<void>;
    sellsByDrink(req: Request, res: Response): Promise<void>;
}
