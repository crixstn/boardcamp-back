import { Router } from "express";
import { getGames, postGame } from "../controllers/gamesController";
import { validateGame } from "../middlewares/validateGame";

const router = Router();

router.get('/games', getGames);
router.post('/games', validateGame, postGame)

export default router;
