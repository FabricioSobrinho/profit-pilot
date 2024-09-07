import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class SellsController {
  async Index(req: Request, res: Response) {
    const tentId = req.tentId;
    const sells = await prisma.sell.findMany({ where: { tentId } });

    return res.json(sells);
  }

  async newSell(req: Request, res: Response) {
    try {
      const { value, paymentMethodId, tentId, dishes, drinks } = req.body;

      if (!value || !paymentMethodId || !tentId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newSell = await prisma.sell.create({
        data: {
          value,
          paymentMethodId,
          tentId,
          sellDishes: {
            create: dishes.map((dish: { dishId: number; quantity: number }) => ({
              dishId: dish.dishId,
              quantity: dish.quantity,
            })),
          },
          sellDrinks: {
            create: drinks.map((drink: { drinkId: number; quantity: number }) => ({
              drinkId: drink.drinkId,
              quantity: drink.quantity,
            })),
          },
        },
        include: {
          sellDishes: true,
          sellDrinks: true,
        },
      });

      return res.status(201).json(newSell);
    } catch (error) {
      console.error("Erro ao criar venda:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
