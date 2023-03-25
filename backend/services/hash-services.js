const crypto = require('crypto');

class HashServices {
    hashOtp (data) {
        return crypto.createHmac('sha256', process.env.HASH_SECRET).update(data).digest('hex');
    }
}

module.exports = new HashServices();