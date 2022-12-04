import { Schema } from "mongoose";

const videoSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "items",
      required: true,
      index: true,
    },
    image: { type: String, required: true },
    story: {
      type: String,
      required: true,
      default: "줄거리 정보가 없는 작품이에요.",
    },
    stars: { type: Number, required: true, default: 0 },
  },
  {
    collection: "videos",
    timestamps: true,
  }
);

export default videoSchema;
