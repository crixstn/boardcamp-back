import { db } from "../database/database.js";
import customersSchema from "../schemas/customerSchema.js";

export async function validateCustomer(req, res, next){

    if(!req.body){
        return res.status(201).send("body is required.")
    }

    const validation = customersSchema.validate(req.body)
    if(validation.error){
        const err = validation.error.details.map((detail) => detail.message);
        return res.status(400).send(err)
    }

    try{
        const cpfExist = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [req.body.cpf]);
        if(cpfExist.rows[0]){
            return res.sendStatus(409)
        }
    }catch(err){
        return res.status(500).send(err.message);
    }

    next()
}

export async function validateUpdateCustomer(req, res, next){
    const { id } = req.params
    const { cpf } = req.body;

    if(!cpf){
        return res.status(201).send("body is required.")
    }

    const validation = customersSchema.validate(upCustomer)
    if(validation.error){
        const err = validation.error.details.map((detail) => detail.message);
        return res.status(400).send(err)
    }

    try{
        const cpf = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);
        if(cpf.rows[0]){
            if(cpf.rows[0].id != id){
              return res.sendStatus(409)
            }
        }

    }catch(err){
        return res.status(500).send(err.message);
    }

    next()
}