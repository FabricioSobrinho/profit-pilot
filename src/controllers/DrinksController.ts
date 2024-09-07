import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class DrinksController {
  async newDrink(req: Request, res: Response) {
    try {
      const tentId = req.tentId;

      const { name, value } = req.body;

      if (!name || value === undefined || !tentId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newDrink = await prisma.drink.create({
        data: {
          name,
          value,
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
