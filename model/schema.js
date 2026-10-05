const mongoose = require("mongoose");

// How to write a field:
//   name:  String                                  type only
//   name:  { type: String, required: true, minLength: 3 }   with rules
//   tags:  [String]                                array of a type
//   createdAt: { type: Date, default: Date.now }   default value
//
// How to write a reference (stores the other document's _id):
//   author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
//   ref takes the model name, and reading gives back only the id
//   until you ask for the document with .populate("author")

// Post: title, content, author, createdAt
const postSchema = new mongoose.Schema({

});

// Comment: text, post (ref "Post"), author, createdAt
const commentSchema = new mongoose.Schema({

});

const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Post, Comment };
