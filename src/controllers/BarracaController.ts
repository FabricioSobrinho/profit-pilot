import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { hash } from "bcryptjs";

export class BarracaController {
  async index(req: Request, res: Response) {
    const barracas = await prisma.barracas.findMany({
      select: { nome: true, id: true },
    });

    return res.json({ barracas });
  }

  async create(req: Request, res: Response) {
    const { nome, senha } = req.body;
    const barracaExists = await prisma.barracas.findUnique({ where: { nome } });

    if (barracaExists) {
      return res.json({ error: "barraca já existe" }).status(401);
    }

    const hashPass = await hash(senha, 8);

    const barraca = await prisma.barracas.create({
      data: {
        nome,
        senha: hashPass,
      },
    });

    const { id } = barraca;

    return res.json({ barraca: { id, nome } }).status(201);
  }

  async getBarraca(req: Request, res: Response) {
    const id = req.barracaId;

    const barraca = await prisma.barracas.findUnique({ where: { id } });
    return res.json({ barraca });
  }
}
