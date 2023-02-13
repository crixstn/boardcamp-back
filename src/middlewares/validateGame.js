import { db } from "../database/database.js";
import gameSchema from "../schemas/gameSchema.js";

export async function validateGame(req, res, next){

    if(!req.body){
        return res.status(201).send("body is required.")
    }

    const validation = gameSchema.validate(req.body)
    if(validation.error){
        const err = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(err)
    }

    try{
        const game = await db.query(`SELECT * FROM games WHERE name = $1`, [req.body.name]);
        if(game.rows[0]){
            return res.sendStatus(409)
        }
    }catch(err){
        return res.status(500).send(err.message);
    }

    next();
}