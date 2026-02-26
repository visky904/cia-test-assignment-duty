const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },
    totalCapacity: { type: Number, required: true },
    rows: { type: Number },
    cols: { type: Number }
});

module.exports = mongoose.model('Room', RoomSchema);