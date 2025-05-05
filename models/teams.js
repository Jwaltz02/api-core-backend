const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true
  },
  cohort: {
    type: Number,
    required: true
  },
  teamSize: {
    type: Number,
    required: true
  },
  project: {
    type: String,
    required: true
  },
  branchName: {
    type: String,
    required: true
  },
  feature: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Team', teamSchema);
