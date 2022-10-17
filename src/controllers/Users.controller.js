import * as userRepository from "../repositories/User.repository.js"

const getUsersUrls = async (req, res) => {
    const { userId } = res.locals.session;
    let userData;
    let userUrls;

    const visitCount = await userRepository.calculateVisitCount(res, userId);

    userData = await userRepository.getUserData(res, userId);

    userUrls = await userRepository.getUserUrlsByUserId(res, userId);

    if (!userUrls.rowCount) {
        userData = userData.rows[0];
        userData.visitCount = 0;
        userData.shortenedUrls = userUrls.rows;
    } else {
        userData = userData.rows[0];
        userData.visitCount = visitCount.rows[0].visitCount;
        userData.shortenedUrls = userUrls.rows;
    }

    return res.status(200).send(userData);
};

export { getUsersUrls };