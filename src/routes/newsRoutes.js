import express from 'express';
import News from '../models/news.js';

const router = express.Router();

// ✅ GET - كل الأخبار
router.get('/', async (req, res) => {
  try {
    const newsList = await News.find().sort({ date: -1 });
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET - خبر واحد بالـ id
router.get('/:id', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ message: "الخبر غير موجود" });
    res.json(newsItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST - إضافة خبر جديد
router.post('/', async (req, res) => {
  try {
    const newsItem = new News({
      titleAr: req.body.titleAr,
      titleEn: req.body.titleEn,
      descriptionAr: req.body.descriptionAr,
      descriptionEn: req.body.descriptionEn,
      date: req.body.date,
      image: req.body.image,
    });

    const savedNews = await newsItem.save();
    res.status(201).json(savedNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ PUT - تعديل خبر
router.put('/:id', async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNews) return res.status(404).json({ message: "الخبر غير موجود" });
    res.json(updatedNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE - حذف خبر
router.delete('/:id', async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) return res.status(404).json({ message: "الخبر غير موجود" });
    res.json({ message: "تم حذف الخبر بنجاح" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
