const mongoose = require('mongoose');

const schema = mongoose.Schema;


const modelSchema = new schema({
    topic: {type: String,required: true},
    roomType: {type: String,required: true},
    ownerId: {type: schema.Types.ObjectId, ref: 'User'},
    speakers: {
        type: [
            {type: schema.Types.ObjectId,ref:'User'},
        ],
        required: false,
    },
    listener: {
        type: [
            {type: schema.Types.ObjectId,ref:'User'},
        ],
        required: false,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Room',modelSchema,'rooms');