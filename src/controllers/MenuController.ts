import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class MenuController {
  async index(req: Request, res: Response) {
    try {
      const { tentName } = req.params;
      const tent = await prisma.tent.findUnique({
        where: {
          name: tentName,
        },
      });

      if (!tent) {
        res.status(404).json({ error: "Barraca não encontrada" });
      }

      const dishs = await prisma.dish.findMany({
        where: {
          tentId: tent?.id,
        },
        select: { name: true, value: true },
      });

      const drinks = await prisma.drink.findMany({
        where: {
          tentId: tent?.id,
        },
        select: { name: true, value: true },
      });

      res.status(200).json({ dishs: dishs, drinks: drinks });
    } catch (e) {
      res.status(500).json("Internal error");
    }
  }
}
