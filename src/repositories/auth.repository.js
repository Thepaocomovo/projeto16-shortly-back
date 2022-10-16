import connection from "../database/Postgres.js";


const existentUser = async (res, email) => {
    let existentUser;
    try {
        existentUser = await connection.query(`
        SELECT * FROM users  
        WHERE email = $1;`, [email]
        );
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    if(existentUser.rowCount) {
        res.locals.user =  existentUser.rows[0];
    }

    return existentUser.rowCount ? true : false;
};


const createUser = async (res, name, email, password) => {
    try {
        await connection.query(`
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3);`, [name, email, password]
        );
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

const existentSession = async (res, userId) => {
    let existentSession;
    try {
        existentSession = await connection.query(`
        SELECT * FROM sessions 
        WHERE "userId" = $1;`, [userId]
        );
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

       if(existentSession.rowCount) {
        res.locals.session =  existentSession.rows[0];
    }

    return existentSession.rowCount ? true : false;
};

const updateTokenSession = async (res, userId, token) => {
    try {
        await connection.query(`UPDATE sessions SET token = $1
        WHERE "userId" = $2 
        ;`, [token, userId]);
        return res.status(200).send({ token: token });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

const createSession = async (res, userId, token) => {
    try {
        await connection.query(`
        INSERT INTO sessions ("userId", token) 
        VALUES ($1, $2);`, [userId, token]
        );
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}




export { existentUser, createUser, existentSession, updateTokenSession, createSession }