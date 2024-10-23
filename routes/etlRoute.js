const express = require("express");
const router = express.Router();
const etlService = require("../services/etlService");

router.get("/", etlService);

module.exports = router;
