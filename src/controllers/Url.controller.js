import joi from "joi";
import connection from "../database/Postgres.js";
import { nanoid } from 'nanoid'

const urlSchema = joi.object({
    url: joi
        .string()
        .required()
        .regex(
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
        ),
});

const shortenUrl = async (req, res) => {
    const { userId } = res.locals.session;
    const { url } = req.body;
    const shortUrl = nanoid(10)

    const validation = urlSchema.validate({ url }, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }

    try {
        await connection.query(`
    INSERT INTO urls ("userId", url, "shortUrl") 
    VALUES ($1, $2, $3);
    ;`, [userId, url, shortUrl])

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    return res.status(201).send({ shortUrl })
};

const getUrlById = (req, res) => {


const {id} = req.params
console.log(id)


    return res.sendStatus(200);
};
export { shortenUrl, getUrlById }