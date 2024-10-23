const mongoose = require("mongoose");

// Define the schema for campaign metrics
const campaignMetricSchema = new mongoose.Schema({
  campaignName: {
    type: String,
    required: true,
  },
  conversionRate: {
    type: String,
    required: true,
  },
  budgetUtilization: {
    type: String,
    required: true,
  },
  costPerConversion: {
    type: String,
    required: true,
  },
});

// Define the schema for lead metrics
const leadMetricSchema = new mongoose.Schema({
  totalLeads: {
    type: Number,
    required: true,
  },
  convertedLeads: {
    type: Number,
    required: true,
  },
  conversionRate: {
    type: String,
    required: true,
  },
  leadStatusCounts: {
    type: Object,
    required: true,
  },
  avgResponseTime: {
    type: String,
    required: true,
  },
});

// Define the main metrics schema
const metricSchema = new mongoose.Schema({
  leadMetrics: {
    type: leadMetricSchema,
    required: true,
  },
  campaignMetrics: {
    type: [campaignMetricSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Metric model
const Metric = mongoose.model("Metric", metricSchema);
module.exports = Metric;
