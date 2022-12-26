const { Schema } = require("mongoose");

const starSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "items",
      required: true,
      index: true,
    },
    author: { type: String, required: true },
    star: { type: Number, required: false },
  },
  {
    collection: "stars",
    timestamps: true,
  }
);

module.exports = starSchema;
