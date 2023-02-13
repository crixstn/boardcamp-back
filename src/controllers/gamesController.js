import { db } from "../database/database.js";

export async function getGames(req, res) {
    try{
        const games = await db.query(`SELECT * FROM games`);
        res.send(games.rows)
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postGame(req, res){
    const {name, image, stockTotal, pricePerDay} = req.body

    try{
        let id = await db.query(`SELECT * FROM games`)
        id = id.rows.length + 1

        await db.query(`INSERT INTO games VALUES ($1, $2, $3, $4, $5)`, [id, name, image, stockTotal, pricePerDay]);
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}