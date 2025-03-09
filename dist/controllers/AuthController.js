"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prisma_1 = require("../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthController {
    async login(req, res) {
        const { name, password } = req.body;
        const tent = await prisma_1.prisma.tent.findUnique({
            where: { name },
        });
        if (!tent) {
            return res.json({ error: "Barraca não existe" }).status(404);
        }
        const { id } = tent;
        const isValidPassword = await (0, bcryptjs_1.compare)(password, tent.password);
        if (!isValidPassword) {
            return res.json({ error: "Senha inválida" }).status(401);
        }
        const secret = process.env.SECRET;
        const token = (0, jsonwebtoken_1.sign)({ id: tent.id }, secret, { expiresIn: "8h" });
        return res.json({ tent: { id, name }, token }).status(200);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map