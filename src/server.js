import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(cors());
server.use(json());

const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server running in port: ${port}`);
})


