const nodemailer = require("nodemailer");
const Lead = require("../models/leadModel");
const Campaign = require("../models/campaignModel");
const Metric = require("../models/metricModel");
require("dotenv").config();

// Configure Nodemailer transporter (replace with your email credentials)
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send email alerts
async function sendEmailAlert(subject, message) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: "skg050210@gmail.com", // list of receivers
    subject,
    text: message,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// ETL process: Transform and load metrics
const etlProcess = async (req, res) => {
  try {
    // Step 1: Extract (Fetch lead and campaign data)
    const leads = await Lead.find({});
    const campaigns = await Campaign.find({});

    // Step 2: Transform (Calculate metrics)
    const totalLeads = leads.length;
    const convertedLeads = leads.filter((lead) => lead.isConverted).length;
    const conversionRate =
      totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0;

    // Calculate lead status counts
    const leadStatusCounts = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});

    // Calculate average response time
    const avgResponseTime =
      leads.reduce((acc, lead) => {
        const responseTime =
          (new Date(lead.lastContactedAt) - new Date(lead.createdAt)) /
          (1000 * 60 * 60); // in hours
        return acc + (responseTime >= 0 ? responseTime : 0); // Avoid negative response times
      }, 0) / (totalLeads || 1); // Avoid division by zero

    // Prepare campaign metrics
    const campaignMetrics = campaigns.map((campaign) => {
      const costPerConversion =
        campaign.conversions > 0
          ? (campaign.spent / campaign.conversions).toFixed(2)
          : 0;
      const budgetUtilization =
        campaign.budget > 0
          ? ((campaign.spent / campaign.budget) * 100).toFixed(2)
          : 0;
      const conversionRate =
        campaign.totalImpressions > 0
          ? ((campaign.conversions / campaign.totalImpressions) * 100).toFixed(
              2
            )
          : 0;

      return {
        campaignName: campaign.name,
        costPerConversion,
        budgetUtilization,
        conversionRate,
        totalSpent: campaign.spent,
        totalConversions: campaign.conversions,
        totalImpressions: campaign.totalImpressions,
      };
    });

    // Step 3: Load (Store metrics in the Metric collection)
    const metrics = {
      leadMetrics: {
        totalLeads,
        convertedLeads,
        conversionRate: `${conversionRate}%`,
        leadStatusCounts,
        avgResponseTime: `${avgResponseTime.toFixed(2)} hours`,
      },
      campaignMetrics,
    };

    await Metric.create(metrics);

    // Step 4: Check for alert conditions
    try {
      if (conversionRate < 5) {
        // Trigger email alert for low conversion rate
        await sendEmailAlert(
          "Low Conversion Rate Alert",
          `Alert: The conversion rate is critically low at ${conversionRate}%.`
        );
      }
    } catch (error) {
      console.error("Failed to send email alert:", error.message);
    }

    try {
      if (avgResponseTime > 90) {
        // Trigger email alert for high response time
        await sendEmailAlert(
          "High Response Time Alert",
          `Alert: The average response time is very high at ${avgResponseTime.toFixed(
            2
          )} hours.`
        );
      }
    } catch (error) {
      console.error("Failed to send email alert:", error.message);
    }

    console.log("ETL process completed successfully");
    res.status(200).json("ETL process completed successfully");
  } catch (error) {
    console.error("Error in ETL process:", error.message);
    res
      .status(500)
      .json({ message: "Error in ETL process", error: error.message });
  }
};

module.exports = etlProcess;
