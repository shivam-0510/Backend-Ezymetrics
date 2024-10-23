const mongoose = require("mongoose");

// Lead Schema
const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["New", "Contacted", "Qualified", "Closed", "Unqualified"],
    default: "New",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    enum: [
      "Website",
      "Referral",
      "Email Campaign",
      "Ad Campaign",
      "Direct Contact",
      "Social Media",
    ],
    default: "Website",
  },
  sourceDetails: {
    type: String, // Additional info about the lead source (e.g., campaign name)
    default: "",
  },
  assignedTo: {
    type: String, // Could be a reference to an 'Agent' collection later
    required: true,
  },
  lastContactedAt: {
    type: Date,
    default: null,
  },
  followUpDate: {
    type: Date,
    default: null, // Date for the next follow-up action
  },
  notes: {
    type: String, // Allows agents to add any additional info
    default: "",
  },
  isConverted: {
    type: Boolean,
    default: false,
  },
  responseTime: {
    type: Number,
    default: 0, // Response time in seconds
  },
  tags: [
    {
      type: String, // Allows categorization of leads
    },
  ],
  score: {
    type: Number,
    default: 0, // Lead score for prioritization
  },
});

// Create and export the Lead model
module.exports = mongoose.model("Lead", leadSchema);
