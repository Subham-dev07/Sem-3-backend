const mongoose = require("mongoose");
const { ref } = require("node:process");

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
  title:{type:String},
  content:{type:String},
  author:{type:String},
  createdAt:{type:Date,default:Date.now}
});

// Comment: text, post (ref "Post"), author, createdAt
const commentSchema = new mongoose.Schema({
  text:{type:String},
  author:{type:String},
  createdAt:{type:Date,default:Date.now},
  post:{type:mongoose.Schema.Types.ObjectId,ref:"Post"}
});

const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Post, Comment };
