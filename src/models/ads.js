import mongoose from "mongoose";

const AdSchema = new mongoose.Schema(
  {
    images: { type: [String], required: true }, // صور فقط
  },
  { timestamps: true }
);

const Ad = mongoose.model("Ad", AdSchema);
export default Ad;
