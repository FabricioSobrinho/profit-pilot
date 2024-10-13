import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { hash } from "bcryptjs";

export class TentsController {
  async index(req: Request, res: Response) {
    const tents = await prisma.tent.findMany({
      select: { name: true, id: true },
    });

    return res.json({ tents });
  }

  async create(req: Request, res: Response) {
    try {
      const { name, password, passwordConfirmation } = req.body;
      const tentExists = await prisma.tent.findUnique({ where: { name } });
      console.log(passwordConfirmation);
      
      if (tentExists) {
        return res.json({ error: "Barraca já existe" }).status(401);
      }

      const hashPass = await hash(password, 8);

      const tent = await prisma.tent.create({
        data: {
          name,
          password: hashPass,
        },
      });

      const { id } = tent;

      return res.json({ tent: { id, name } }).status(201);
    } catch (e) {
      console.log(e);
    }
  }

  async getTent(req: Request, res: Response) {
    const id = req.tentId;

    const tent = await prisma.tent.findUnique({ where: { id } });
    return res.json({ tent });
  }
}
