const mongoose = require("mongoose");
const Schema = mongoose.Shema;
const model = mongoose.model;

const CategorySchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
});

module.exports = model("Category", CategorySchema);
