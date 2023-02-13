import { db } from "../database/database.js";

export async function getCustomers(req, res) {
    try{
        const customers = await db.query(`SELECT * FROM customers`);
        res.send(customers.rows)
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function getCustomer(req, res){
    const { id } = req.params;

    try{
        const user = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        if(!user.rows){
            return res.sendStatus(404);
        }

        res.send(user.rows[0]);
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function postCustomer(req, res){
    const { name, phone, cpf, birthday} = req.body;
    
    try{
        let id = await db.query(`SELECT * FROM customers`)
        id = id.rows.length +1

        await db.query(`INSERT INTO customers VALUES ($1, $2, $3, $4, $5)`, [id, name, phone, cpf, birthday])
        res.sendStatus(201)
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function putCustomer(req, res){
    const { name, phone, cpf, birthday} = req.body;
    const { id } = req.params

    try{
        const update = await db.query(`UPDATE customers SET "name" = $1, "phone" = $2, "cpf" = $3, "birthday" = $4  WHERE "id" = $5`,[name,phone,cpf,birthday,id]);
        if(update.rowCount == 0){
            return res.sendStatus(404)
        }
        
        res.sendStatus(201)
    }catch(err){
        return res.status(500).send(err.message);
    }
    
}