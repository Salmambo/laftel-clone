import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: false },
    // nickname: { type: String, required: true, default: "" },
    // image: { type: String, required: true, default: "#" },
    refreshToken: { type: String, default: "" },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
    isGmail: { type: Boolean, required: true, default: false },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export default userSchema;
