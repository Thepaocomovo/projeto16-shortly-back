import joi from "joi";
import { nanoid } from 'nanoid'
import * as urlRepository from "../repositories/Urls.repository.js";

const urlSchema = joi.object({
    url: joi
        .string()
        .required()
        .regex(
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
        )
});

const shortenUrl = async (req, res) => {
    const { userId } = res.locals.session;
    const { url } = req.body;
    const shortUrl = nanoid(8);

    const validation = urlSchema.validate({ url }, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }

    await urlRepository.insertNewUrl(res, userId, url, shortUrl)

    return res.status(201).send({ shortUrl })
};

const getUrlById = async (req, res) => {
    const { id } = req.params
    let urlQuery;
    let url;
    if (isNaN(Number(id))) {
        return res.sendStatus(404);
    }

    urlQuery = await urlRepository.selectUrlByID(res, id)

    if (!urlQuery.rowCount) {
        return res.sendStatus(404);
    }

    url = urlQuery.rows[0]
    delete url.userId;

    return res.status(200).send(url);
};

const openUrl = async (req, res) => {
    const { shortUrl } = req.params;

    const query = await urlRepository.selectUrlByShortUrl(res, shortUrl);

    if (!query.rowCount) {
        return res.sendStatus(404);
    }

    const visitCounter = query.rows[0].visitCounter;

    await urlRepository.incrementVisitCount(res, shortUrl, visitCounter + 1);

    return res.redirect(query.rows[0].url);
};

const deleteUrl = async (req, res) => {
    const userId = res.locals.session.userId;
    const { id } = req.params;
    if (isNaN(Number(id))) {
        return res.sendStatus(404);
    }

    const urlQuery = await urlRepository.selectUrlByID(res, id)

    if (!urlQuery.rowCount) {
        return res.sendStatus(404);
    }

    if (urlQuery.rows[0].userId !== userId) {
        return res.sendStatus(401);
    }

    await urlRepository.deleteUrlById(res, id);

    return res.sendStatus(204);
};

export { shortenUrl, getUrlById, openUrl, deleteUrl }