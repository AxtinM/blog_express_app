const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageHeadline: {
    type: Object,
  },
  content: {
    type: String,
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Object }],
  featured: {
    type: Boolean,
    default: false,
  },
  overview: {
    type: String,
  },
});

module.exports = model("Article", articleSchema);
