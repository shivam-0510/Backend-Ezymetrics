const mongoose = require("mongoose");

// Campaign Schema
const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Running", "Paused", "Completed", "Scheduled"],
    default: "Scheduled",
  },
  budget: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    default: 0,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  conversions: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  channel: {
    type: String,
    enum: [
      "Google Ads",
      "Facebook Ads",
      "Email",
      "Instagram Ads",
      "LinkedIn Ads",
      "Other",
    ],
    default: "Google Ads",
  },
  targetAudience: {
    type: String, 
    default: "",
  },
  goals: {
    type: String, 
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);
