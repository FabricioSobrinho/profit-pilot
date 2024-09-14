import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class DrinksController {
  async index(req: Request, res: Response) {
    try {
      const tentId = req.tentId;
      const drinks = await prisma.drink.findMany({ where: { tentId } });

      res.status(200).json(drinks);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  }
  async newDrink(req: Request, res: Response) {
    try {
      const tentId = req.tentId;

      const { name, value, drinkCost } = req.body;

      if (!name || value === undefined || !tentId || !drinkCost) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newDrink = await prisma.drink.create({
        data: {
          name,
          value,
          drinkCost,
          tentId,
        },
      });

      return res.status(201).json(newDrink);
    } catch (error) {
      console.error("Erro ao criar bebida:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
