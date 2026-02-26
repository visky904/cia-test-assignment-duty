const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    semester: { type: Number, required: true },
    department: { type: String, required: true }
});

module.exports = mongoose.model('Student', StudentSchema);