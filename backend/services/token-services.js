const jwt = require('jsonwebtoken');
const refreshModels = require('../models/refresh-models');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenServices {
    generateToken(payload) {
        const accessToken = jwt.sign(payload,accessTokenSecret,{
            expiresIn: '1h'
        });
        const refreshToken = jwt.sign(payload,refreshTokenSecret,{
            expiresIn: '1y'
        });
        return {accessToken,refreshToken}
    }

    async storeRefreshToken(token,userId) {
        try {
            await refreshModels.create({
                token,
                userId,
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    
    async verifyAccessToken (token) {
        return jwt.verify(token, accessTokenSecret);
    }
}

module.exports = new TokenServices();