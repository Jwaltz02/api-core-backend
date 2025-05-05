const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
    leaveType: {
        type: String,
        enum: ['sick', 'vacation', 'personal'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
}, { timestamps: true });

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

module.exports = LeaveRequest;
