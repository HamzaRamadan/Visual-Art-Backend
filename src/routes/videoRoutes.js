import express from "express";
import Video from "../models/videoModel.js";
import { uploadVideo } from "../middleware/uploadMiddleware.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { deleteImage } from "../utils/cloudinaryUtils.js";

const router = express.Router();

// ✅ GET - الحصول على الفيديو الحالي
router.get("/", async (req, res) => {
  try {
    const video = await Video.findOne().sort({ date: -1 });
    res.json(video || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST - رفع فيديو (Replace القديم)
router.post("/", protect, adminOnly, uploadVideo.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "❌ لازم ترفع فيديو" });
    }

    // لو فيه فيديو قديم → نمسحه من الـ DB ومن Cloudinary
    const oldVideo = await Video.findOne();
    if (oldVideo && oldVideo.video) {
      try {
        // Extract public ID from Cloudinary URL
        const publicId = oldVideo.video.split('/').pop().split('.')[0];
        await deleteImage(`visual-art/videos/${publicId}`);
      } catch (deleteError) {
        console.error("Error deleting old video from Cloudinary:", deleteError);
      }
      await Video.findByIdAndDelete(oldVideo._id);
    }

    const videoItem = new Video({
      video: req.file.path,
      publicId: req.file.filename, 
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    const savedVideo = await videoItem.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE - حذف الفيديو (اختياري)
router.delete("/", protect, adminOnly, async (req, res) => {
  try {
    const video = await Video.findOne();
    if (!video) return res.status(404).json({ message: "❌ مفيش فيديو متخزن" });

    // Delete from Cloudinary
    if (video.publicId) {
      try {
        await deleteImage(`visual-art/videos/${video.publicId}`);
      } catch (deleteError) {
        console.error("Error deleting video from Cloudinary:", deleteError);
      }
    }

    await Video.findByIdAndDelete(video._id);
    res.json({ message: "✅ تم حذف الفيديو" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
