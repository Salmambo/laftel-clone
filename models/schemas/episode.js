const { Schema } = require("mongoose");

const episodeSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "items",
      required: true,
      index: true,
    },
    number: { type: Number, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    collection: "episodes",
    timestamps: true,
  }
);

module.exports = episodeSchema;
