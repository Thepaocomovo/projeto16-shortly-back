import connection from "../database/Postgres.js";

const getRankingList = async (res) => {
    let rankingList;
    try {
        rankingList = await connection.query(`
        SELECT users.id, 
            users.name, 
            COALESCE(COUNT(urls.id), 0) AS "linksCount", 
            COALESCE(SUM(urls."visitCounter"), 0) AS "visitCount"
        FROM users
        FULL JOIN urls 
            ON users.id = urls."userId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;

    ;`)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    return rankingList.rows;
}

export { getRankingList };