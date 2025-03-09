"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellsController = void 0;
const prisma_1 = require("../utils/prisma");
class SellsController {
    async Index(req, res) {
        const tentId = req.tentId;
        const sells = await prisma_1.prisma.sell.findMany({ where: { tentId } });
        return res.json(sells);
    }
    async newSell(req, res) {
        try {
            const tentId = req.tentId;
            const { value, paymentMethodId, dishes, drinks } = req.body;
            if (!value || !paymentMethodId || !tentId) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            const newSell = await prisma_1.prisma.sell.create({
                data: {
                    value,
                    paymentMethodId,
                    tentId,
                    sellDishes: {
                        create: dishes.map((dish) => ({
                            dishId: dish.dishId,
                            quantity: dish.quantity,
                        })),
                    },
                    sellDrinks: {
                        create: drinks.map((drink) => ({
                            drinkId: drink.drinkId,
                            quantity: drink.quantity,
                        })),
                    },
                },
                include: {
                    sellDishes: true,
                    sellDrinks: true,
                },
            });
            return res.status(201).json(newSell);
        }
        catch (error) {
            console.error("Erro ao criar venda:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
exports.SellsController = SellsController;
//# sourceMappingURL=SellsController.js.map