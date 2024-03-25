import { Router } from "express";
import { BarracaController } from "../controllers/BarracaController";
import { AuthController } from "../controllers/AuthController";

import { authMiddleware } from "../middlewares/auth";

export const router = Router();

const barracaController = new BarracaController();
const authController = new AuthController();

router.post("/barracas", barracaController.create);
router.post("/login", authController.login);

router.use(authMiddleware)
router.get("/barracas", barracaController.index);
