import express from "express";
import Ad from "../models/ads.js";
import { upload } from "../middleware/uploadMiddleware.js"; // Multer middleware لرفع الصور

const router = express.Router();

// ✅ إضافة إعلان جديد (صور متعددة)
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    // const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];
    const images = req.files ? req.files.map((f) => f.path || f.secure_url) : [];



    if (images.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const newAd = new Ad({ images });
    await newAd.save();

    res.status(201).json(newAd);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating ad" });
  }
});

// ✅ جلب كل الإعلانات
router.get("/", async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching ads" });
  }
});

// ✅ تعديل إعلان (إضافة صور جديدة فوق القديمة)
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];

    const updatedAd = await Ad.findByIdAndUpdate(
      req.params.id,
      { $push: { images: { $each: images } } },
      { new: true }
    );

    if (!updatedAd) return res.status(404).json({ error: "Ad not found" });

    res.json(updatedAd);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating ad" });
  }
});

// ✅ حذف إعلان كامل
router.delete("/:id", async (req, res) => {
  try {
    const deletedAd = await Ad.findByIdAndDelete(req.params.id);
    if (!deletedAd) return res.status(404).json({ error: "Ad not found" });

    res.json({ message: "Ad deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting ad" });
  }
});

// ✅ حذف صورة واحدة من إعلان
router.delete("/:id/image", async (req, res) => {
  try {
    const { image } = req.body; // الصورة جاية من الـ frontend

    if (!image) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const updatedAd = await Ad.findByIdAndUpdate(
      req.params.id,
      { $pull: { images: image } }, // شيل الصورة من الـ array
      { new: true }
    );

    if (!updatedAd) return res.status(404).json({ error: "Ad not found" });

    res.json({ message: "Image deleted successfully", ad: updatedAd });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting image" });
  }
});

export default router;
