const mongoose = require('mongoose');

const certificateHistorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  certificateType: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('CertificateHistory', certificateHistorySchema);
