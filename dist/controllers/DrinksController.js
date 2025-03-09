"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrinksController = void 0;
const prisma_1 = require("../utils/prisma");
class DrinksController {
    async index(req, res) {
        try {
            const tentId = req.tentId;
            const drinks = await prisma_1.prisma.drink.findMany({ where: { tentId } });
            res.status(200).json(drinks);
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    async newDrink(req, res) {
        try {
            const tentId = req.tentId;
            const { name, value, drinkCost } = req.body;
            if (!name || value === undefined || !tentId || !drinkCost) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            const newDrink = await prisma_1.prisma.drink.create({
                data: {
                    name,
                    value,
                    drinkCost,
                    tentId,
                },
            });
            return res.status(201).json(newDrink);
        }
        catch (error) {
            console.error("Erro ao criar bebida:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
exports.DrinksController = DrinksController;
//# sourceMappingURL=DrinksController.js.map