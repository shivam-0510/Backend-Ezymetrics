const axios = require("axios");
const Lead = require("../models/leadModel");
const Campaign = require("../models/campaignModel");

const fetchData = async (req, res) => {
  try {
    const { data: leads } = await axios.get(
      "http://localhost:8080/api/v1/lead/data"
    );
    const { data: campaigns } = await axios.get(
      "http://localhost:8080/api/v1/campaign/data"
    );

    const leadDocuments = leads.map((lead) => ({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
      createdAt: lead.createdAt,
      source: lead.source,
      assignedTo: lead.assignedTo,
      lastContactedAt: lead.lastContactedAt,
      notes: lead.notes,
      isConverted: lead.isConverted,
    }));

    // Transform campaign data
    const campaignDocuments = campaigns.map((campaign) => ({
      name: campaign.name,
      status: campaign.status,
      budget: campaign.budget,
      spent: campaign.spent,
      clicks: campaign.clicks,
      channel: campaign.channel,
      conversions: campaign.conversions,
      targetAudience: campaign.targetAudience,
      goals: campaign.totalImpressions,
      createdAt: campaign.createdAt,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
    }));

    await Lead.insertMany(leadDocuments);
    console.log(`Saved ${leadDocuments.length} leads to the database`);
    await Campaign.insertMany(campaignDocuments);
    console.log(`Saved ${campaignDocuments.length} campaigns to the database`);
    res.status(200).json({
      message: [
        `Saved ${leadDocuments.length} leads to the database`,
        `Saved ${campaignDocuments.length} leads to the database`,
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = fetchData;
