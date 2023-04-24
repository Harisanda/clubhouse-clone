const requestModels = require('../models/request-models');
const ObjectID = require('mongoose').Types.ObjectId;

class RequestService {
    async create(payload) {
        const {rooms,sender,owner} = payload;
        const request = await requestModels.create({
            rooms,
            sender,
            owner
        });

        return request;
    }

    async getAllRequest() {
        const requests = await requestModels.find();
        return requests;
    }

    async changeRequestStatus(requestId,change) {
        if (!ObjectID.isValid(requestId))
        return console.log('Invalide id to change status');

        const request = await requestModels.findByIdAndUpdate(
            requestId,
            {$set: {status: change}},
            { new: true, upsert: true},
        );
        return request;
    }
}

module.exports = new RequestService();