import * as rankingRepository from "../repositories/Ranking.repository.js"

const getRanking = async (req, res) => {
    const rankingList = await rankingRepository.getRankingList(res);

    res.status(200).send(rankingList);
};

export { getRanking };