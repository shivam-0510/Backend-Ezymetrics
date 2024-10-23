const express = require("express");
const fetchRouter = express.Router();
const fetchData = require("..//services/fetchData");

fetchRouter.get("/fetch", fetchData);

module.exports = fetchRouter;
