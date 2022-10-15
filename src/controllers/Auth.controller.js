import joi from "joi";
import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import connection from "../database/Postgres.js";


const teste = (req, res) => {
    const query = connection.query('SELECT * FROM users;');

    res.sendStatus(200)
}


export { teste }