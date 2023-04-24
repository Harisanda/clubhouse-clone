const mongoose = require('mongoose');
const roomModels = require("../models/room-models");
const ObjectID = require('mongoose').Types.ObjectId;

class RoomService {
    async create(payload) {
        const {topic,roomType,ownerId} = payload;
        const room = await roomModels.create({
            topic,
            roomType,
            ownerId,
            speakers:[ownerId]
        });
        return room;
    }

    async getAllRooms(types) {
        const rooms = await roomModels.find({roomType: {$in: types}}).
            populate('speakers').
            populate('ownerId').
            exec();
        return rooms;
    }

    async getRoom(roomId) {
        const room = await roomModels.findOne({_id: roomId});
        return room;
    }

    async addListener (roomId,client) {

        if (!ObjectID.isValid(roomId) || !ObjectID.isValid(client))
        return console.log('Invalide')
        
        const room = await roomModels.findByIdAndUpdate(
            roomId,
            {$addToSet: { listener: client }},
            { new: true, upsert: true},
        );
        return room;
    }

    async addSpeaker (roomId,speaker) {

        if (!ObjectID.isValid(roomId) || !ObjectID.isValid(speaker))
        return console.log('Invalide')

        const room = await roomModels.findByIdAndUpdate(
            roomId,
            {$addToSet: {speakers: speaker}},
            {new: true, upsert: true},
        )

        return room;
    }
}

module.exports = new RoomService();