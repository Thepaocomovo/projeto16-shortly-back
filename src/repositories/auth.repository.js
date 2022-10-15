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

    return existentUser.rowCount ? true : false
}






export { existentUser }