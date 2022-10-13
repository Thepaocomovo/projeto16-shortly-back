import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); 
const server = express();

server.use(express.json());
server.use(cors());

server.get("/status", (req, res) => {
  return res.sendStatus(200);
  });

server.listen(process.env.PORT, () => { console.log(`listen on ${process.env.PORT}`) });