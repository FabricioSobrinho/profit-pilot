"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.json({ error: "Token inválido" }).status(401);
    }
    const [_, token] = authorization.split(" ");
    try {
        const secret = process.env.SECRET;
        const decoded = (0, jsonwebtoken_1.verify)(token, secret);
        const { id } = decoded;
        req.tentId = id;
        next();
    }
    catch (error) {
        return res.json({ error: "Erro ao autenticar usuário" }).status(401);
    }
}
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map