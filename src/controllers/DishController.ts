import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class DishController {
  async newDish(req: Request, res: Response) {
    try {
      const tentId = req.tentId;

      const { name, value } = req.body;

      if (!name || value === undefined || !tentId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newDrink = await prisma.dish.create({
        data: {
          name,
          value,
          tentId,
        },
      });

      return res.status(201).json(newDrink);
    } catch (error) {
      console.error("Erro ao criar prato:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
