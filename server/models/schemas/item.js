const { Schema } = require("mongoose");

const itemSchema = new Schema(
  {
    thumbnail: { type: String, required: "item has thumnail:String" },
    title: { type: String, required: "item has title:String" },
    genre: { type: [String], required: true, default: [] },
    tags: { type: [String], required: true, default: [] },
    releaseType: {
      type: String,
      required: false,
      enum: ["TVA", "극장판", "OVA", "라이트애니", "기타"],
    },
    updateDay: {
      type: String,
      required: false,
      enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    },
    isOnly: Boolean,
    isDubbing: Boolean,
    isUncut: Boolean,
    isAd: Boolean,
    isAdult: Boolean,
  },
  {
    collection: "items",
    timestamps: true,
  }
);

module.exports = itemSchema;
