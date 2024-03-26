import { Router } from "express";
import { BarracaController } from "../controllers/BarracaController";
import { AuthController } from "../controllers/AuthController";
import { VendasController } from "../controllers/VendasController";

import { authMiddleware } from "../middlewares/auth";

export const router = Router();

const barracaController = new BarracaController();
const authController = new AuthController();
const vendasController = new VendasController();

router.get("/barracas", barracaController.index);
router.post("/barracas", barracaController.create);

router.post("/login", authController.login);

router.use(authMiddleware);
router.get("/barraca", barracaController.getBarraca);

router.get("/vendas",  vendasController.Index);
router.post("/vendas",  vendasController.novaVenda);