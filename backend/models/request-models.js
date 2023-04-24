const mongoose = require('mongoose');

const schema = mongoose.Schema;


const requestSchema = new schema({
    rooms: { type: mongoose.Schema.Types.ObjectId,ref: 'Room' },
    sender: { type: mongoose.Schema.Types.ObjectId,ref: 'User' },
    owner: { type: mongoose.Schema.Types.ObjectId,ref: 'User' },
    status: { 
        type: String,
        default: 'pending' 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Request',requestSchema,'requests');