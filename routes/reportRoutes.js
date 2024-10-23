const express = require("express");
const Metric = require("../models/metricModel"); // Adjust path as necessary
const { generatePDFReport } = require("../services/reportService");

const router = express.Router();

// Endpoint to generate PDF report
router.get("/generate-pdf-report", async (req, res) => {
  try {
    // Fetch metrics data from the database
    const metrics = await Metric.find();
    // Calculate overall metrics based on fetched data
    const totalLeads = metrics[0].leadMetrics.totalLeads; // Assuming each metric document represents a lead
    const convertedLeads = metrics[0].leadMetrics.convertedLeads;
    const conversionRate = metrics[0].leadMetrics.conversionRate;
    const avgResponseTime = metrics[0].leadMetrics.avgResponseTime;

    // Prepare the lead metrics object
    const leadMetrics = {
      totalLeads,
      convertedLeads,
      conversionRate: `${conversionRate}%`, // Formatting conversion rate as percentage
      avgResponseTime: `${avgResponseTime} hours`, // Formatting average response time
    };

    // Prepare the campaign metrics
    const campaignMetrics = metrics[0].campaignMetrics.map((metric) => {
      return {
        campaignName: metric.campaignName, // Default name if missing
        conversionRate: `${metric.conversionRate}%`, // Formatting conversion rate as percentage
        budgetUtilization: `${metric.budgetUtilization}%`, // Formatting budget utilization as percentage
        costPerConversion: `$${metric.costPerConversion}`, // Formatting cost per conversion
      };
    });

    // Generate the final report object
    const reportData = {
      leadMetrics,
      campaignMetrics,
    };

    // Generate PDF report
    const pdfPath = generatePDFReport(reportData);

    // Send back the PDF file path as a response
    res.json({
      message: "PDF report generated successfully",
      pdfPath,
    });
  } catch (error) {
    console.error("Error generating PDF report:", error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
