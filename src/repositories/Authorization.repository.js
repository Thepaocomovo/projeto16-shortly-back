import connection from "../database/Postgres.js";

const getSession = async (res, token) => {
    let session;
    try {
        session = await connection.query(`    
        SELECT * FROM sessions WHERE token = $1;
        `, [token])
        if (!session.rowCount) {
            return res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    if (session.rowCount) {
        res.locals.session = session.rows[0];
    }
};

export { getSession }