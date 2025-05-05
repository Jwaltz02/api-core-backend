const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: Date,
  createdBy: {
    type: String,
    required: true,
  },
  // Add other fields as needed
}, { timestamps: true });

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
