const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Import Models
const Student = require('./models/Student');
const Staff = require('./models/Staff');
const Room = require('./models/Room');
const allocateDuties = require('./utils/allocationEngine');

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. MongoDB Connection
// MONGO_URI = .env file
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 4. Routes
app.post('/api/students', async (req, res) => {
    try {
        const cleanData = req.body.filter(item => item.rollNo && item.name);
        await Student.deleteMany({}); 
        await Student.insertMany(cleanData);
        res.status(200).send("Students synced!");
    } catch (err) {
        console.error("Student Sync Error:", err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/staff', async (req, res) => {
    try {
        // 1. Filter 
        const cleanData = req.body
            .filter(item => item.name && item.email)
            .map(item => ({
                ...item,
                isAvailable: String(item.isAvailable).toLowerCase() === 'true' 
            }));
        
        if (cleanData.length === 0) {
            return res.status(400).send("No valid staff data found in CSV. Check your headers!");
        }

        await Staff.deleteMany({}); 
        await Staff.insertMany(cleanData);
        console.log(`✅ Successfully synced ${cleanData.length} staff members.`);
        res.status(200).send("Staff synced!");
    } catch (err) {
        console.error("Detailed Server Error:", err.message); 
        res.status(500).json({ error: err.message });
    }
});
app.post('/api/rooms', async (req, res) => {
    try {
        const cleanData = req.body.filter(item => item.roomNumber);
        await Room.deleteMany({});
        await Room.insertMany(cleanData);
        res.status(200).send("Rooms synced!");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/allocate', async (req, res) => {
    try {
        const [students, rooms, staff] = await Promise.all([
            Student.find(),
            Room.find(),
            Staff.find({ isAvailable: true })
        ]);
        const result = allocateDuties(students, rooms, staff);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));