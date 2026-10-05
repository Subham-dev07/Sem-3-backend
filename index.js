const express = require("express");

const connect = require("./connect");

// both schemas live in one file; we design them in class
const { Post, Comment } = require("./model/schema");

const app = express();

connect();

app.use(express.json());

//post

app.post("/posts", async function (req, res) {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/posts", async function (req, res) {
  try {
    const posts = await Post.find()
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ---------------- Comment ---------------- */

// the body needs to carry the post's _id
app.post("/comments", async function (req, res) {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// add .populate("post") once the post reference exists
app.get("/comments", async function (req, res) {
  try {
    const comments = await Comment.find()
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
