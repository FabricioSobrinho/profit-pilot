import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { TentsController } from "../controllers/TentsController";
import { SellsController } from "../controllers/SellsController";
import { DrinksController } from "../controllers/DrinksController";
import { DishController } from "../controllers/DishController";
import { MenuController } from "../controllers/MenuController";
import { ReportController } from "../controllers/ReportController";

import { authMiddleware } from "../middlewares/auth";

export const router = Router();

const tentController = new TentsController();
const authController = new AuthController();
const sellsController = new SellsController();
const drinksController = new DrinksController();
const dishController = new DishController();
const menuController = new MenuController();
const reportController = new ReportController();

router.get("/tents", tentController.index);
router.post("/tents", tentController.create);

router.post("/login", authController.login);

router.get("/menu/:tentName", menuController.index);

router.use(authMiddleware);
router.get("/tent", tentController.getTent);

router.get("/sells", sellsController.Index);
router.post("/sells", sellsController.newSell);

router.get("/drinks", drinksController.index);
router.post("/drinks", drinksController.newDrink);

router.get("/dishs", dishController.getDishs);
router.post("/dishs", dishController.newDish);
router.put("/dishs/:id", dishController.updateDish);
router.delete("/dishs/:id", dishController.deleteDish);

router.get("/sells-report/all", reportController.getAllSells);
router.get("/sells-report/todaysofar", reportController.getAllSells);
router.get("/sells-report/sellbydish/:dishId", reportController.sellsByDish);
router.get("/sells-report/sellbydrink/:drinkId", reportController.sellsByDrink);
