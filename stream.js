
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const conversations = [];

app.post("/rahul", (req, res) => {
  conversations.push({
    sender: "Rahul",
    message: req.body.message
  });

  res.json({ success: true });
});

app.post("/priya", (req, res) => {
  conversations.push({
    sender: "Priya",
    message: req.body.message
  });

  res.json({ success: true });
});

app.get("/messages", (req, res) => {
  res.json(conversations);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});