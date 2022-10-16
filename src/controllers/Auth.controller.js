import joi from "joi";
import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import connection from "../database/Postgres.js";
import * as authRepository from "../repositories/auth.repository.js"

const newUserSchema = joi.object({
    name: joi.string().required().trim(),
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required(),
    confirmPassword: joi.string().trim().required()
});
const userSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required(),
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

    if (await authRepository.existentUser(res, newUser.email)) {
        return res.sendStatus(409);
    }

    await authRepository.createUser(res, newUser.name, newUser.email, newUser.password);

    return res.sendStatus(201);
};



const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email, !password) {
        return res.sendStatus(422);
    }

    const validation = userSchema.validate({ email, password }, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }

    const user = {
        email: stripHtml(email).result,
        password: password
    }

    if (!await authRepository.existentUser(res, user.email)) {
        return res.sendStatus(401);
    }

    const registeredUser = res.locals.user;

    if (!await bcrypt.compare(user.password, registeredUser.password)) {
        return res.sendStatus(401);
    }

    const token = uuidv4();

    
    if (await authRepository.existentSession(res, registeredUser.id)) {
        return await authRepository.updateTokenSession(res, registeredUser.id, token);
    }
    



    await authRepository.createSession(res, registeredUser.id, token);

    // try {
    //     await connection.query(`
    //     INSERT INTO sessions ("userId", token) 
    //     VALUES ($1, $2);`, [registeredUser.id, token]
    //     );
    // } catch (error) {
    //     console.log(error);
    //     return res.sendStatus(500);
    // }

    return res.status(200).send({ token: token });
}


export { registration, login }