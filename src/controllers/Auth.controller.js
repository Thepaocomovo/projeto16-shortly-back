import joi from "joi";
import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import connection from "../database/Postgres.js";


const newUserSchema = joi.object({
    name: joi.string().required().trim(),
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required(),
    confirmPassword: joi.string().trim().required()
});

const registration = async (req, res) => {
    let {
        name,
        email,
        password,
        confirmPassword
    } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.sendStatus(422);
    }

    const validation = newUserSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }

    if (password !== confirmPassword) {
        return res.sendStatus(422);
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = {
        name: stripHtml(name).result,
        email: stripHtml(email).result,
        password: hashPassword
    }


    try {
        const existentUser = await connection.query(`
        SELECT * FROM users  
        WHERE email = $1;`, [newUser.email]
        );
        if(existentUser.rows.length) {
            console.log(existentUser.rows)
            return res.sendStatus(409);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }


    try {
        console.log(newUser.hashPassword)
        await connection.query(`
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3);`, [newUser.name, newUser.email, newUser.password]
        );
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    return res.sendStatus(201);
};

export { registration }