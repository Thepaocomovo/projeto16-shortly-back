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
    const shortUrl = nanoid(8);

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

const getUrlById = async (req, res) => {
    const { id } = req.params

    if(isNaN(Number(id)) ){
        return res.sendStatus(404);
    }

    const urlQuery = await connection.query(`
        SELECT id, "shortUrl", url FROM urls 
        WHERE id = $1 
        ;`, [id]);

    if(!urlQuery.rowCount){
        return res.sendStatus(404);
    }

    return res.status(200).send(urlQuery.rows[0]);
};


export { shortenUrl, getUrlById }