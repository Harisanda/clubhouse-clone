const roomModels = require("../models/room-models");

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
}

module.exports = new RoomService();