import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class ReportController {
  async getAllSells(req: Request, res: Response) {
    try {
      const tentId = req.tentId;

      const sales = await prisma.sell.findMany({
        where: {
          tentId: tentId,
        },
        include: {
          sellDishes: {
            include: {
              dish: true,
            },
          },
          sellDrinks: {
            include: {
              drink: true,
            },
          },
        },
      });

      res.status(200).json(sales);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  }
  async todaySoFarSells(req: Request, res: Response) {
    try {
      const tentId = req.tentId;

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const sales = await prisma.sell.findMany({
        where: {
          tentId: tentId,
          createdAt: {
            gte: todayStart,
          },
        },
        include: {
          sellDishes: {
            include: {
              dish: true,
            },
          },
          sellDrinks: {
            include: {
              drink: true,
            },
          },
        },
      });

      res.status(200).json(sales);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  }

  async sellsByDish(req: Request, res: Response) {
    try {
      const tentId = req.tentId;
      const { dishId } = req.params;

      const sales = await prisma.sell.findMany({
        where: {
          tentId: tentId,
          sellDishes: {
            some: {
              dishId: Number(dishId),
            },
          },
        },
        include: {
          sellDishes: {
            include: {
              dish: true,
            },
          },
          sellDrinks: {
            include: {
              drink: true,
            },
          },
        },
      });

      res.status(200).json(sales);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  }

  async sellsByDrink(req: Request, res: Response) {
    try {
      const tentId = req.tentId;
      const { drinkId } = req.params;

      const sales = await prisma.sell.findMany({
        where: {
          tentId: tentId,
          sellDrinks: {
            some: {
              drinkId: Number(drinkId),
            },
          },
        },
        include: {
          sellDishes: {
            include: {
              dish: true,
            },
          },
          sellDrinks: {
            include: {
              drink: true,
            },
          },
        },
      });

      res.status(200).json(sales);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  }
}
