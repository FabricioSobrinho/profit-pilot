"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const prisma_1 = require("../utils/prisma");
class ReportController {
    async getAllSells(req, res) {
        try {
            const tentId = req.tentId;
            const sales = await prisma_1.prisma.sell.findMany({
                where: {
                    tentId: tentId,
                },
                include: {
                    sellDishes: {
                        include: {
                            dish: true,
                        },
                    },
                    sellDrinks: {
                        include: {
                            drink: true,
                        },
                    },
                },
            });
            res.status(200).json(sales);
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    async todaySoFarSells(req, res) {
        try {
            const tentId = req.tentId;
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);
            const sales = await prisma_1.prisma.sell.findMany({
                where: {
                    tentId: tentId,
                    createdAt: {
                        gte: todayStart,
                    },
                },
                include: {
                    sellDishes: {
                        include: {
                            dish: true,
                        },
                    },
                    sellDrinks: {
                        include: {
                            drink: true,
                        },
                    },
                },
            });
            res.status(200).json(sales);
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    async sellsByDish(req, res) {
        try {
            const tentId = req.tentId;
            const { dishId } = req.params;
            const sales = await prisma_1.prisma.sell.findMany({
                where: {
                    tentId: tentId,
                    sellDishes: {
                        some: {
                            dishId: Number(dishId),
                        },
                    },
                },
                include: {
                    sellDishes: {
                        include: {
                            dish: true,
                        },
                    },
                    sellDrinks: {
                        include: {
                            drink: true,
                        },
                    },
                },
            });
            res.status(200).json(sales);
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    async sellsByDrink(req, res) {
        try {
            const tentId = req.tentId;
            const { drinkId } = req.params;
            const sales = await prisma_1.prisma.sell.findMany({
                where: {
                    tentId: tentId,
                    sellDrinks: {
                        some: {
                            drinkId: Number(drinkId),
                        },
                    },
                },
                include: {
                    sellDishes: {
                        include: {
                            dish: true,
                        },
                    },
                    sellDrinks: {
                        include: {
                            drink: true,
                        },
                    },
                },
            });
            res.status(200).json(sales);
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
exports.ReportController = ReportController;
//# sourceMappingURL=ReportController.js.map