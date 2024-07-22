import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController {
  async login(req: Request, res: Response) {
    const { name, password } = req.body;

    const tent = await prisma.tent.findUnique({
      where: { name },
    });

    if (!tent) {
      return res.json({ error: "Barraca não existe" }).status(404);
    }
    const { id } = tent;

    const isValidPassword = await compare(password, tent.password);

    if (!isValidPassword) {
      return res.json({ error: "Senha inválida" }).status(401);
    }

    const secret = process.env.SECRET!;

    const token = sign({ id: tent.id }, secret, { expiresIn: "8h" });

    return res.json({ tent: { id, name }, token }).status(200);
  }
}
