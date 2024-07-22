import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { TentsController } from "../controllers/TentsController";
import {SellsController} from "../controllers/SellsController"

import { authMiddleware } from "../middlewares/auth";

export const router = Router();

const tentController = new TentsController();
const authController = new AuthController();
const sellsController = new SellsController();

router.get("/barracas", tentController.index);
router.post("/barracas", tentController.create);

router.post("/login", authController.login);

router.use(authMiddleware);
router.get("/tent", tentController.getTent)

router.get("/vendas",  sellsController.Index);
router.post("/vendas",  sellsController.newSell);