import { db } from "../database/database.js";
import gameSchema from "../schemas/gameSchema.js";

export async function validateGame(req, res, next){
    if(!req.body){
        return res.sendStatus(201)
    }

    const validation = gameSchema.validate(req.body)
    if (validation.error){
        return res.status(400).send(validation.error.details)
    }

    try{
        const game = await db.query(`SELECT * FROM games WHERE name = $1`, [req.body.name]);
        if(game.rows[0]){
            return res.sendStatus(409)
        }
    }catch(err){
        res.sendStatus(500)
    }

    next();
}