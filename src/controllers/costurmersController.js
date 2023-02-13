import { db } from "../database/database.js";

export async function getCostumers(req, res) {
    try{
        const costumers = await db.query(`SELECT * FROM costumers`);
        res.send(costumers.rows)
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getCostumer(req, res){
    const Id = req.params.id;

    try{
        const user = await db.query(`SELECT * FROM costumers WHERE id = $1`, [Id]);
        if(!user.rows[0]){
            return res.sendStatus(404);
        }

        res.send(user.rows[0]);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}