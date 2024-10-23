const express = require("express");
const campaignRouter = express.Router();
const campaignData = require("../controllers/campaignController");

campaignRouter.get("/data", campaignData);

module.exports = campaignRouter;
