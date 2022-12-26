const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: false },
    // nickname: { type: String, required: true, default: "" },
    // image: { type: String, required: true, default: "#" },
    refreshtoken: { type: String, default: "" },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
    isLaftel: { type: Boolean, required: true },
    isInfo: { type: Boolean, required: true },
    isEvent: { type: Boolean, required: true, default: false },
    isGmail: { type: Boolean, required: true, default: false },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = userSchema;
