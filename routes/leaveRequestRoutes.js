const express = require('express');
const LeaveRequest = require('../models/LeaveRequest');
const router = express.Router();

// Create a new leave request
router.post('/', async (req, res) => {
    try {
        const { leaveType, startDate, endDate } = req.body;
        const leaveRequest = new LeaveRequest({ leaveType, startDate, endDate });
        await leaveRequest.save();
        res.status(201).json(leaveRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error creating leave request', error });
    }
});

// Get all leave requests
router.get('/', async (req, res) => {
    try {
        const leaveRequests = await LeaveRequest.find();
        res.status(200).json(leaveRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leave requests', error });
    }
});

module.exports = router;
