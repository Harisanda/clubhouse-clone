const roomServices = require("../services/room-services");
const RoomDto = require('../dtos/room-dto');

class RoomsControllers {
    async create (req,res) {
        const {topic,roomType} = req.body;
        if(!topic || !roomType) {
            return res.status(400).json({message: "Champ icomplet"});
        }

        const room = await roomServices.create({
            topic,
            roomType,
            ownerId: req.user._id,
        });

        return res.json(new RoomDto(room));
    }

    async index (req,res) {
        const rooms = await roomServices.getAllRooms(['open']);
        const allRooms = rooms.map((room) => new RoomDto(room));
        return res.json(allRooms);
    }
}

module.exports = new RoomsControllers();