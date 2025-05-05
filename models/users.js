<<<<<<< HEAD
// users.js
const mongoose = require("mongoose");
const Employee = require('./employee');

const UserSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  employeeId: { 
    type: String, 
    unique: true, 
    trim: true, 
    required: true,
    ref: "Employee", 
    index: true
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  role: {
    type: String,
    enum: ["Employee", "Intern", "Partner", "Capstone Student"],
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
    index: true
  },
  internDetails: {
    type: new mongoose.Schema({
      type: { 
        type: String, 
        enum: ["Paid", "Unpaid"], 
        required: true 
      },
      university: { 
        type: String, 
        required: true 
      },
      startDate: { 
        type: Date, 
        required: true,
        validate: {
          validator: function(v) {
            return !this.endDate || v < this.endDate;
          },
          message: 'Start date must be before end date'
        }
      },
      endDate: { 
        type: Date, 
        required: true 
      },
    }),
    required: function() {
      return this.role === "Intern";
    },
    default: undefined
  },
  capstoneDetails: {
    type: new mongoose.Schema({
      projectName: { 
        type: String, 
        required: true 
      },
      mentor: { 
        type: String, 
        required: true 
      },
      rippenWork: { 
        type: Boolean, 
        default: false 
      },
    }),
    required: function() {
      return this.role === "Capstone Student";
    },
    default: undefined
  },
  partnerDetails: {
    type: new mongoose.Schema({
      company: { 
        type: String, 
        required: true 
      },
      isPaid: { 
        type: Boolean, 
        required: true 
      },
    }),
    required: function() {
      return this.role === "Partner";
    },
    default: undefined
  },
  teamId: { 
    type: String, 
    ref: "Team" 
  },
  documents: [
    {
      docId: mongoose.Schema.Types.ObjectId,
      name: String,
      url: String,
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });


UserSchema.pre("save", function(next) {
  if (this.role === "Employee") {
    this.internDetails = undefined;
    this.capstoneDetails = undefined;
    this.partnerDetails = undefined;
  } else if (this.role === "Intern") {

    if (!this.internDetails) {
      this.invalidate("internDetails", "Intern details are required for an Intern role.");
    }
  } else if (this.role === "Capstone Student") {
    if (!this.capstoneDetails) {
      this.invalidate("capstoneDetails", "Capstone project details are required for Capstone Student role.");
    }
  } else if (this.role === "Partner") {
    if (!this.partnerDetails) {
      this.invalidate("partnerDetails", "Partner details are required for Partner role.");
    }
  }
  next();
});

UserSchema.index({ teamId: 1, role: 1 });

module.exports = mongoose.model("User", UserSchema, "users");
=======
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  email: String,
  role: {
    type: String,
    enum: ['Employee', 'Intern', 'Partner', 'Capstone Student'],
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },

  internDetails: {
    type: Object,
    default: null
  },
  capstoneDetails: {
    type: Object,
    default: null
  },
  partnerDetails: {
    type: Object,
    default: null
  },

  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },

  documents: [{
    docId: Schema.Types.ObjectId,
    name: String,
    url: String,
    uploadedAt: Date
  }],

  certificates: [{
    certId: Schema.Types.ObjectId,
    type: String,
    generatedAt: Date,
    sentAt: {
      type: Date,
      default: null
    },
    url: String
  }]
});

module.exports = mongoose.model('User', userSchema);
>>>>>>> upstream/feat_ems_212
