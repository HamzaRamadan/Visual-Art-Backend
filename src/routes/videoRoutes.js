import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs";
import Video from "../models/videoModel.js";

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith("video")) {
      cb(null, "uploads/videos");
    } else {
      cb(new Error("❌ الملف لازم يكون فيديو"), false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

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
router.post("/", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "❌ لازم ترفع فيديو" });
    }

    // لو فيه فيديو قديم → نمسحه من الـ DB ومن الفولدر
    const oldVideo = await Video.findOne();
    if (oldVideo) {
      const oldPath = path.join("uploads", oldVideo.video.replace("/uploads/", ""));
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      await Video.findByIdAndDelete(oldVideo._id);
    }

    // نرفع الجديد
    const videoItem = new Video({
      video: `/uploads/videos/${req.file.filename}`,
    });

    const savedVideo = await videoItem.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE - حذف الفيديو (اختياري)
router.delete("/", async (req, res) => {
  try {
    const video = await Video.findOne();
    if (!video) return res.status(404).json({ message: "❌ مفيش فيديو متخزن" });

    const videoPath = path.join("uploads", video.video.replace("/uploads/", ""));
    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }

    await Video.findByIdAndDelete(video._id);
    res.json({ message: "✅ تم حذف الفيديو" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
