const jimp = require('jimp');
const path = require('path');
const userDto = require('../dtos/user-dto');
const userServices = require('../services/user-services');

class activateControllers {
    async activate (req,res) {

        const {name,avatar} = req.body;
        if(!name || !avatar) {
            res.status(400).json({message: 'Tous les champs doit être complèter'});
        }
        //Image base 64
        const buffer = Buffer.from(avatar.replace(/^data:image\/png;base64,/,''),'base64');

        const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
        try {
            const jimpResponse = await jimp.read(buffer);
            jimpResponse.resize(150,jimp.AUTO).write(path.resolve(__dirname, `../storage/${imagePath}`));
        } catch (error) {
            res.status(500).json({message: "Impossible de traiter l'image"});
        }

        const userId = req.user._id;

        //update user
        try {
            const user = await userServices.findUser({_id: userId});
            if (!user) {
                res.status(404).json({message: "User not found"});
            }

            user.activated = true;
            user.name = name;
            user.avatar = `/storage/${imagePath}`;
            user.save();
            res.json({user: new userDto(user), auth: true});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Un erreur est survenu"});
        }
    }
}

module.exports = new activateControllers();