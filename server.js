const express = require("express");
const mongoose = require("mongoose");
const leadRouter = require("./routes/leadRoutes");
const campaignRouter = require("./routes/campaignRoutes");
const reportRouter = require("./routes/reportRoutes");
const fetchRouter = require("./routes/fetchDataRoutes");
const etlRouter = require("./routes/etlRoute");
const dotenv = require("dotenv");

dotenv.config();

const server = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Middleware
server.use(express.json());
server.use("/api/v1/lead", leadRouter);
server.use("/api/v1/campaign", campaignRouter);
server.use("/api/v1/data", fetchRouter);
server.use("/api/v1/etl", etlRouter);
server.use("/api/v1/report", reportRouter);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT}`);
});
