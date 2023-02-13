import { Router } from "express";
import { getCustomers, getCustomer, postCustomer, putCustomer } from "../controllers/customersController.js";
import { getGames, postGame } from "../controllers/gamesController.js";
import { validateGame } from "../middlewares/validateGame.js";
import { validateCustomer , validateUpdateCustomer} from "../middlewares/validateCustomers.js";

const router = Router();

router.get('/games', getGames);
router.post('/games', validateGame, postGame);

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomer);
router.post('/customers', validateCustomer, postCustomer);
router.put('/customers/:id', validateUpdateCustomer, putCustomer);

export default router;
