const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 20,
    },
    desc: {
        type: String,
        max: 500,
    },
    likes: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);