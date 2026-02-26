// routes/allocation.js
const express = require('express');
const router = express.Router();
const allocateDuties = require('../utils/allocationEngine');
const { Student, Room, Staff } = require('../models/schemas'); 

router.post('/generate-duty', async (req, res) => {
    try {
        const [students, rooms, staff] = await Promise.all([
            Student.find({ semester: req.body.semester }), 
            Room.find(),
            Staff.find({ isAvailable: true })
        ]);

        const result = allocateDuties(students, rooms, staff);

        res.status(200).json({
            message: "Allocation successful",
            data: result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;