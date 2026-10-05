const mongoose = require("mongoose");

// same local mongo, bas db ka naam change kiya hai (mydb -> blogdb)
function connect() {
  mongoose
    .connect("mongodb://localhost:27017/blogdb")
    .then(() => {
      console.log("Connected To DB!");
    })
    .catch((err) => {
      console.log("DB connection failed", err.message);
    });
}

module.exports = connect;
