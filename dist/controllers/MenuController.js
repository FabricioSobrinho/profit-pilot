"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const prisma_1 = require("../utils/prisma");
class MenuController {
    async index(req, res) {
        try {
            const { tentName } = req.params;
            const tent = await prisma_1.prisma.tent.findUnique({
                where: {
                    name: tentName,
                },
            });
            if (!tent) {
                res.status(404).json({ error: "Barraca não encontrada" });
            }
            const dishs = await prisma_1.prisma.dish.findMany({
                where: {
                    tentId: tent === null || tent === void 0 ? void 0 : tent.id,
                },
                select: { name: true, value: true },
            });
            const drinks = await prisma_1.prisma.drink.findMany({
                where: {
                    tentId: tent === null || tent === void 0 ? void 0 : tent.id,
                },
                select: { name: true, value: true },
            });
            res.status(200).json({ dishs: dishs, drinks: drinks });
        }
        catch (e) {
            res.status(500).json("Internal error");
        }
    }
}
exports.MenuController = MenuController;
//# sourceMappingURL=MenuController.js.map