const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Staff', StaffSchema);