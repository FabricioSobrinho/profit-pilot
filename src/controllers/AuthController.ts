import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController {
  async login(req: Request, res: Response) {
    const { nome, senha } = req.body;

    const barraca = await prisma.barracas.findUnique({
      where: { nome },
    });

    if (!barraca) {
        return res.json({ error: "Barraca não existe" }).status(404);
    }
    
    const { id } = barraca;
    
    const isValidPassword = await compare(senha, barraca.senha);
    console.log(isValidPassword);

    if (!isValidPassword) {
      return res.json({ error: "Senha inválida" }).status(401);
    }

    const secret = process.env.SECRET!;

    const token = sign({ id: barraca.id }, secret, { expiresIn: "8h" });

    return res.json({ barraca: { id, nome}, token }).status(200);
  }
}
