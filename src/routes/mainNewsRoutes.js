import express from "express";
import MainNews from "../models/MainNews.js";
import mongoose from "mongoose";

const router = express.Router();

// ===== GET all main news =====
router.get("/", async (req, res) => {
  try {
    const news = await MainNews.find({});
    res.json(news || []); // لو مفيش بيانات، رجّع array فاضي
  } catch (err) {
    console.error("Fetch MainNews error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ===== POST add new main news =====
router.post("/", async (req, res) => {
  try {
    const { titleAr, titleEn, descriptionAr, descriptionEn } = req.body;

    if (!titleAr || !titleEn || !descriptionAr || !descriptionEn) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const news = new MainNews({ titleAr, titleEn, descriptionAr, descriptionEn });
    const created = await news.save();
    res.status(201).json(created);
  } catch (err) {
    console.error("Create MainNews error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ===== PUT update main news by id =====
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const news = await MainNews.findById(id);
    if (!news) return res.status(404).json({ message: "News not found" });

    news.titleAr = req.body.titleAr || news.titleAr;
    news.titleEn = req.body.titleEn || news.titleEn;
    news.descriptionAr = req.body.descriptionAr || news.descriptionAr;
    news.descriptionEn = req.body.descriptionEn || news.descriptionEn;

    const updated = await news.save();
    res.json(updated);
  } catch (err) {
    console.error("Update MainNews error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ===== DELETE main news by id =====
// DELETE main news by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const deleted = await MainNews.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "News not found" });

    res.json({ message: "News deleted" });
  } catch (err) {
    console.error("Delete MainNews error:", err);
    res.status(500).json({ message: err.message });
  }
});


export default router;
