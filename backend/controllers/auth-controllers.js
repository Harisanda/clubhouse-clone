const hashServices = require('../services/hash-services');
const otpService = require('../services/otp-services');
const userServices = require('../services/user-services');
const tokenServices = require('../services/token-services');
const UserDto = require('../dtos/user-dto');

class AuthController {
    async sendOtp (req,res) {
        const { phone } = req.body;
        if(!phone){
            res.status(400).json({message: 'Le champ doit être remplis'});
        }

        //génerer un nombre à 4 chiffre pour envoyer avec le otp
        const otp = await otpService.generatorOtp();

        //hashage otp
        const ttl = 1000 * 60 * 2; //expirer apres 2 min 
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashServices.hashOtp(data);

        //envoyer le otp message
        try {
            //await otpService.sendBySms(phone,otp);
            res.json({
                hash: `${hash}.${expires}`,
                phone ,
                otp
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "le message n'est pas envoyé"})
        }
        //mbola tsy vita test ny envoie sms
    }

    async verifyOtp (req,res) {
        const {otp , hash ,phone} = req.body;
        if (!otp || !hash || !phone) {
            res.status(400).json({message: "tous les champs doivent etre renseigner"});
        }

        const [hahsedOtp,expires] = hash.split('.');
        if(Date.now() > +expires) {
            res.status(400).json({message: 'Code de vérification expiré'});
        }

        const data = `${phone}.${otp}.${expires}`;

        const isValid = otpService.verifyOtp(hahsedOtp,data);
        if (!isValid) {
            res.status(400).json({message: "code de vérification invalide"});
        }

        let user;
        try {
           user = await userServices.findUser({phone: phone});
           if (!user) {
            await userServices.createUser({phone: phone});
           }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'db erreur'});
        }
        console.log(user);
        //Token
        const {accessToken,refreshToken} = tokenServices.generateToken({
            _id: user._id,
            activated: false}
        );

        tokenServices.storeRefreshToken(refreshToken,user._id);

        res.cookie('refreshtoken',refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        res.cookie('accesstoken',accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        const userDto = new UserDto(user);

        res.json({user: userDto,auth: true});
    }
}

module.exports = new AuthController();