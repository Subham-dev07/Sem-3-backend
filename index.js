const express = require("express");
const fs=require("fs")
const statusMonitor = require('express-status-monitor');
const {Transform}=require("stream")
const app = express();

app.use(statusMonitor());
app.use(express.json());




app.listen(3000, function () {
  console.log("Server running on port 3000");
});
