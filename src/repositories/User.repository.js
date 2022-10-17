import connection from "../database/Postgres.js";

const getUserData = async (res, userId) => {
    let userData;

    try {
        userData = await connection.query(`
            SELECT id, name
                FROM users 
            WHERE users.id = $1
        ;`, [userId]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

    return userData;
};

const getUserUrlsByUserId = async (res, userId) => {
    let userUrls;

    try {
        userUrls = await connection.query(`
            SELECT id, "shortUrl", url, "visitCounter" as "visitCount" 
                FROM urls
            WHERE "userId" = $1
        ;`, [userId]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

    return userUrls;
};

const calculateVisitCount = async (res, userId) => {
    let visitCount;
    try {
        visitCount = await connection.query(`
            SELECT SUM("visitCounter") as "visitCount" 
                FROM urls 
            WHERE "userId" = $1
        ;`, [userId]); 
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    
   return visitCount;
};

export { getUserData, getUserUrlsByUserId, calculateVisitCount}