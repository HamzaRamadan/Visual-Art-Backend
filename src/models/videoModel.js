import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    video: { type: String, required: true }, // Cloudinary URL
    publicId: { type: String }, // Cloudinary public ID for deletion
    size: { type: Number }, // File size in bytes
    mimetype: { type: String }, // MIME type
    duration: { type: Number }, // Video duration in seconds
    thumbnail: { type: String }, // Thumbnail URL (optional)
    date: { type: Date, default: Date.now }, // وقت الرفع
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
