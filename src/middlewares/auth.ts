import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: number;
  iat: number;
  exp: number;
};

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json({ error: "Token inválido" }).status(401);
  }

  const [_, token] = authorization.split(" ");

  try {
    const secret = process.env.SECRET!;
    const decoded = verify(token, secret);

    const { id } = decoded as TokenPayload;

    req.tentId = id;

    next();
  } catch (error) {
    return res.json({ error: "Erro ao autenticar usuário" }).status(401);
  }
}
