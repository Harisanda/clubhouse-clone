const crypto =  require('crypto');
const hashServices = require('./hash-services');

const smsSsid = process.env.SMS_SSID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
// const twilio = require('twilio')(smsSsid,smsAuthToken,{
//     lazyloading : true
// });


class OtpService {
    async generatorOtp () {
        const otp = crypto.randomInt(1000,9999);
        return otp;
    }

    // async sendBySms (phone,otp) {
    //     return await twilio.messages.create({
    //         to: phone,
    //         from: process.env.SMS_FROM_NUMBER,
    //         body: `Voici votre code de vérification pour se connecter sur My House: ${otp}`,
    //     })
    //}

    verifyOtp (hahsedOtp,data) {
        let computeHash = hashServices.hashOtp(data);
        return computeHash === hahsedOtp;
    }
}

module.exports = new OtpService();