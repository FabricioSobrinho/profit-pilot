import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class VendasController {
  async Index(req: Request, res: Response) {
    const barracaId = req.barracaId;
    const vendas = await prisma.vendas.findMany({ where: { barracaId } });

    return res.json(vendas);
  }
  
  async novaVenda(req: Request, res: Response) {
    const { valor } = req.body;
    const barracaId = req.barracaId;

    const novaVenda = await prisma.vendas.create({
      data: {
        valor,
        barracaId,
      },
    });

    return res.json(novaVenda).status(201);
  }
}
