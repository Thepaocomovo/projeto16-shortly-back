import * as authorizationRepository from "../repositories/Authorization.repository.js";

const Authorization = async (req, res, next) => {
    if (!req.headers.authorization) return res.sendStatus(401);

    const token = req.headers.authorization.replace("Bearer ", "")

    if (!typeof (token) === "string") {
        return res.sendStatus(401);
    }
    await authorizationRepository.getSession(res, token);

    if (token !== res.locals.session.token) {
        return res.sendStatus(401);
    }
    next();
}


export { Authorization }