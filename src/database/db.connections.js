import pg from 'pg'; 
import dotenv from 'dotenv';

dotenv.config()

const { Pool } = pg;

const configDatabase = {
    connectionString: process.env.DATABASE_URL
}

if(process.env.Mode === 'prod') configDatabase.ssl = true;

new Pool(configDatabase)