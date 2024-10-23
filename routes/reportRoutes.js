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
    const totalLeads = metrics[0].leadMetrics.totalLeads; 
    const convertedLeads = metrics[0].leadMetrics.convertedLeads;
    const conversionRate = metrics[0].leadMetrics.conversionRate;
    const avgResponseTime = metrics[0].leadMetrics.avgResponseTime;

    // Prepare the lead metrics object
    const leadMetrics = {
      totalLeads,
      convertedLeads,
      conversionRate: `${conversionRate}%`, 
      avgResponseTime: `${avgResponseTime} hours`, 
    };

    // Prepare the campaign metrics
    const campaignMetrics = metrics[0].campaignMetrics.map((metric) => {
      return {
        campaignName: metric.campaignName, 
        conversionRate: `${metric.conversionRate}%`, 
        budgetUtilization: `${metric.budgetUtilization}%`, 
        costPerConversion: `$${metric.costPerConversion}`, 
      };
    });

    // Generate the final report object
    const reportData = {
      leadMetrics,
      campaignMetrics,
    };

    // Generate PDF report
    const pdfPath = generatePDFReport(reportData);

    console.log(`PDF report generated successfully - ${pdfPath}`);
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
