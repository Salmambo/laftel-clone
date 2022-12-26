const { Schema } = require("mongoose");

const posterSchema = new Schema(
  {
    item: { type: Schema.Types.ObjectId, ref: "items", required: false },
    link: { type: String, required: false },
    image: { type: String, required: true },
    logo: { type: String, required: true },
    content: { type: String, required: true },
    buttonText: { type: String, required: true },
  },
  {
    collection: "posters",
    timestamps: true,
  }
);

module.exports = posterSchema;
