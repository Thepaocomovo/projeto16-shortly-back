import connection from "../database/Postgres.js";


const insertNewUrl = async (res, userId, url, shortUrl) => {
    try {
        await connection.query(`
    INSERT INTO urls ("userId", url, "shortUrl") 
    VALUES ($1, $2, $3);
    ;`, [userId, url, shortUrl])

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

const selectUrlByID = async (res, id) => {
    let urlQuery;
    try {
        urlQuery = await connection.query(`
        SELECT id, "shortUrl", url FROM urls 
        WHERE id = $1 
        ;`, [id]);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

   return urlQuery;
}

const selectUrlByShortUrl = async (res, shortUrl) => {
    let query;
    try {
        query = await connection.query(`
        SELECT * FROM urls WHERE "shortUrl" = $1 
       ;`, [shortUrl]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    return query;
}

const incrementVisitCount = async (res, shortUrl, newVisitCounter) => {
    try {
        await connection.query(`
        UPDATE urls SET "visitCounter" = $1 WHERE "shortUrl" = $2;
       ;`, [newVisitCounter, shortUrl]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
    
    



export { insertNewUrl, selectUrlByID, selectUrlByShortUrl, incrementVisitCount}