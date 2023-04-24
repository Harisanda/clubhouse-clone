const requestServices = require('../services/request-services');

class RequestControllers {
    async sendRequest (req,res) {
        const {rooms,owner} = req.body;
        //mbola verifiena oe rah en attente ny demande de tsy afaka mandefa
        try {
            if(!rooms || !owner) {
                return res.status(400).json({message: "Champ incomplet"});
            }
            
            const request = await requestServices.create({
                rooms,
                sender: req.user._id,
                owner,
                
            });
            console.log(rooms);
            console.log(request);
    
            return res.json(request);
        } catch (err) {
            console.log(err.message);
        }
    }

    async getRequest (req,res) {
        try{
            const request = await requestServices.getAllRequest();
            return res.json(request);

        } catch(err) {
            console.log(err.message)
        }
    }

    async acceptOrdeclineRequest (req,res) {
        try {
            const requestId = req.params.requestId;
            const {status} = req.body;
            const updateRequest = await requestServices.changeRequestStatus(requestId,status);
            res.json(updateRequest);
        } catch (err) {
            console.log(err.message);
            res.status(401).send('erreur du serveur');
        }
    }
}

module.exports = new RequestControllers();