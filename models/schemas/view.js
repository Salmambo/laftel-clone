const { Schema } = require("mongoose");

const viewSchema = new Schema(
  {
    item: { type: Schema.Types.ObjectId, ref: "items", required: true },
    dailyView: { type: Number, required: true, default: 0 },
    totalView: { type: Number, required: true, default: 0 },
  },
  {
    collection: "views",
    timestamps: true,
  }
);

module.exports = viewSchema;
