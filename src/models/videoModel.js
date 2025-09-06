import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    video: { type: String, required: true }, // مسار الفيديو
    date: { type: Date, default: Date.now }, // وقت الرفع
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
