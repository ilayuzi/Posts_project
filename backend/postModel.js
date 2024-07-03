const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "a note must have a title"],
      unique: true,
    },

    text: {
      type: String,
      required: [true, "a note must have a text"],
      unique: true,
    },
    date: {
      type: String,
    },
    author: {
      type: String,
      required: [true, "A post must have an author"],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
