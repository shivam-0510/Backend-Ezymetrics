const express = require("express");
const leadRouter = express.Router();
const leadData = require("../controllers/leadController");

leadRouter.get("/data", leadData);

module.exports = leadRouter;
