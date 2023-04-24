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

    async show (req,res) {
        const room = await roomServices.getRoom(req.params.roomId);
        return res.json(room);
    }

    async add (req,res) {
        const roomId = req.params.roomId;
        console.log(roomId);

        try {
            const updatedRoom = await roomServices.addListener(roomId,req.user._id);
            return res.json(updatedRoom);
        } catch(err) {
            console.log(err.message);
        }
    }

    async addOnStage (req,res) {
        const roomId = req.params.roomId;
        console.log('roomId to Add speaker',roomId);
        const {sender} = req.body;
        console.log('user to insert',sender);
        try {
            const updatedSpeakers = await roomServices.addSpeaker(roomId,sender);
            console.log(updatedSpeakers);

            res.json(updatedSpeakers);
        } catch (err) {
            console.log(err.message);
        }
    }
}

module.exports = new RoomsControllers();