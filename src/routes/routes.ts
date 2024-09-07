import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { TentsController } from "../controllers/TentsController";
import {SellsController} from "../controllers/SellsController"
import { DrinksController } from "../controllers/DrinksController";
import { DishController } from "../controllers/DishController";

import { authMiddleware } from "../middlewares/auth";

export const router = Router();

const tentController = new TentsController();
const authController = new AuthController();
const sellsController = new SellsController();
const drinksController = new DrinksController();
const dishController = new DishController();

router.get("/tents", tentController.index);
router.post("/tents", tentController.create);

router.post("/login", authController.login);

router.use(authMiddleware);
router.get("/tent", tentController.getTent)

router.get("/sells",  sellsController.Index);
router.post("/sells",  sellsController.newSell);

router.post("/drinks", drinksController.newDrink);

router.post("/dishs", dishController.newDish);


