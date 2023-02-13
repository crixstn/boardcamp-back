import { Router } from "express";
import { getCostumers, getCostumer } from "../controllers/costurmersController.js";
import { getGames, postGame } from "../controllers/gamesController.js";
import { validateGame } from "../middlewares/validateGame.js";

const router = Router();

router.get('/games', getGames);
router.post('/games', validateGame, postGame);

router.get('/costumers', getCostumers);
router.get('/costumers/:id', getCostumer);

export default router;
