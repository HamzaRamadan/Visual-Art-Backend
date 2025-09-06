import { Router } from 'express';
import { getAll, getOne, createOne, updateOne, removeOne } from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import Product from '../models/Product.js';

const router = Router();

// ✅ routes العادية
router.route('/')
  .get(getAll)
  .post(protect, adminOnly, createOne);

router.route('/:id')
  .get(getOne)
  .put(protect, adminOnly, updateOne)
  .delete(protect, adminOnly, removeOne);

// ✅ Route جديدة لإضافة منتجات كتير مرة واحدة
router.post('/bulk', protect, adminOnly, async (req, res) => {
  try {
    const { ar, en } = req.body;

    if (!ar || !en || ar.length !== en.length) {
      return res.status(400).json({ success: false, error: "Invalid data format" });
    }

    const products = ar.map((item, idx) => ({
      img: item.img,
      category: { ar: item.category, en: en[idx].category },
      title: { ar: item.title, en: en[idx].title },
      description: { ar: item.description, en: en[idx].description },
      features: { ar: item.features, en: en[idx].features }
    }));

    const saved = await Product.insertMany(products);
    res.json({ success: true, count: saved.length, data: saved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;
