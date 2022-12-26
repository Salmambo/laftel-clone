const { Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "items",
      required: true,
      index: true,
    },
    author: { type: String, required: true },
    content: { type: String, required: false },
    likes: { type: Number, required: true, default: 0 },
  },
  {
    collection: "reviews",
    timestamps: true,
  }
);

module.exports = reviewSchema;
