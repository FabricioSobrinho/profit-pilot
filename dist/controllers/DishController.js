"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishController = void 0;
const prisma_1 = require("../utils/prisma");
class DishController {
    async getDishs(req, res) {
        try {
            const tentId = req.tentId;
            const dishs = await prisma_1.prisma.dish.findMany({ where: { tentId } });
            res.status(200).json(dishs);
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    async newDish(req, res) {
        try {
            const tentId = req.tentId;
            const { name, value, dishCost } = req.body;
            if (!name || value === undefined || !tentId || !dishCost) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            const newDrink = await prisma_1.prisma.dish.create({
                data: {
                    name,
                    value,
                    dishCost,
                    tentId,
                },
            });
            return res.status(201).json(newDrink);
        }
        catch (error) {
            console.error("Erro ao criar prato:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async updateDish(req, res) {
        try {
            const { id } = req.params;
            const { name, value } = req.body;
            const tentId = req.tentId;
            const updatedDish = await prisma_1.prisma.dish.update({
                where: { id: Number(id) },
                data: {
                    name,
                    value,
                    tentId,
                },
            });
            res.status(200).json(updatedDish);
        }
        catch (e) {
            console.error("Erro ao atualizar o prato:", e);
            res.status(500).json({ error: e.message });
        }
    }
    async deleteDish(req, res) {
        try {
            const { id } = req.params;
            const deleteDish = await prisma_1.prisma.dish.delete({
                where: { id: Number(id) },
            });
            res.status(200).json({ message: "Deleted dish" });
        }
        catch (e) {
            console.error("Erro ao deletar o prato:", e);
            res.status(500).json({ error: e.message });
        }
    }
}
exports.DishController = DishController;
//# sourceMappingURL=DishController.js.map