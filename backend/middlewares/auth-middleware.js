const tokenServices = require('../services/token-services');

module.exports = async function (req,res,next) {
    try {
        const {accesstoken} = req.cookies;
        if (!accesstoken) {
            throw new Error();
        }

        const userData = await tokenServices.verifyAccessToken(accesstoken);

        if (!userData) {
            throw new Error();
        }

        req.user = userData;
        // console.log(userData);
        next();
    } catch (error) {
        res.status(401).json({message: 'Token invalide'});
    }
}