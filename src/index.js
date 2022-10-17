import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/Auth.routes.js";
import urlRouter from "./routers/Url.routes.js";
import userRouter from "./routers/Users.routes.js";

dotenv.config();
const server = express();

server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(urlRouter);
server.use(userRouter);

server.get("/status", (req, res) => {
  return res.sendStatus(200);
});

server.listen(process.env.PORT, () => { console.log(`listen on ${process.env.PORT}`) });