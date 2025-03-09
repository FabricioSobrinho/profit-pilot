"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TentsController = void 0;
const prisma_1 = require("../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
class TentsController {
    async index(req, res) {
        const tents = await prisma_1.prisma.tent.findMany({
            select: { name: true, id: true },
        });
        return res.json({ tents });
    }
    async create(req, res) {
        try {
            const { name, password, passwordConfirmation } = req.body;
            const tentExists = await prisma_1.prisma.tent.findUnique({ where: { name } });
            console.log(passwordConfirmation);
            if (tentExists) {
                return res.json({ error: "Barraca já existe" }).status(401);
            }
            const hashPass = await (0, bcryptjs_1.hash)(password, 8);
            const tent = await prisma_1.prisma.tent.create({
                data: {
                    name,
                    password: hashPass,
                },
            });
            const { id } = tent;
            return res.json({ tent: { id, name } }).status(201);
        }
        catch (e) {
            console.log(e);
        }
    }
    async getTent(req, res) {
        const id = req.tentId;
        const tent = await prisma_1.prisma.tent.findUnique({ where: { id } });
        return res.json({ tent });
    }
}
exports.TentsController = TentsController;
//# sourceMappingURL=TentsController.js.map