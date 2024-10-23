const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Ensure the reports directory exists
const ensureReportsDirectory = () => {
  const dir = path.join(__dirname, "../reports"); // Adjust path as necessary
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const generatePDFReport = (metrics) => {
  ensureReportsDirectory(); // Ensure the directory exists

  const doc = new PDFDocument();
  const filePath = path.join(
    __dirname,
    "../reports",
    `metrics_report_${Date.now()}.pdf`
  );
  doc.pipe(fs.createWriteStream(filePath)); // Stream the PDF to the file

  doc.fontSize(25).text("Metrics Report", { align: "center" });
  doc.moveDown();

  // Adding lead metrics
  doc.fontSize(20).text("Lead Metrics:");
  doc.moveDown();
  doc.fontSize(12).text(`Total Leads: ${metrics.leadMetrics.totalLeads}`);
  doc.text(`Converted Leads: ${metrics.leadMetrics.convertedLeads}`);
  doc.text(`Conversion Rate: ${metrics.leadMetrics.conversionRate}`);
  doc.text(`Average Response Time: ${metrics.leadMetrics.avgResponseTime}`);
  doc.moveDown();

  // Adding campaign metrics
  doc.fontSize(20).text("Campaign Metrics:");
  metrics.campaignMetrics.forEach((campaign) => {
    doc.moveDown();
    doc.fontSize(14).text(`Campaign Name: ${campaign.campaignName}`);
    doc.text(`Conversion Rate: ${campaign.conversionRate}`);
    doc.text(`Budget Utilization: ${campaign.budgetUtilization}`);
    doc.text(`Cost Per Conversion: ${campaign.costPerConversion}`);
  });

  doc.end();

  return filePath; // Return the path of the generated PDF
};

module.exports = {
  generatePDFReport,
};
