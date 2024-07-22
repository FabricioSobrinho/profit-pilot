import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class SellsController {
  async Index(req: Request, res: Response) {
    const tentId = req.tentId;
    const sells = await prisma.sell.findMany({ where: { tentId } });

    return res.json(sells);
  }

  async newSell(req: Request, res: Response) {
    const { value } = req.body;
    const tentId = req.tentId;

    const novaVenda = await prisma.sell.create({
      data: {
        value,
        tentId,
      },
    });

    return res.json(novaVenda).status(201);
  }
}
