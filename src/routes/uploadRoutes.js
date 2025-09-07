import { Router } from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

// رفع صورة واحدة رئيسية + صور إضافية متعددة
router.post(
  '/',
  protect,
  adminOnly,
  upload.fields([
    { name: 'image', maxCount: 1 },  // main image
    { name: 'images', maxCount: 10 } // extra images
  ]),
  (req, res) => {
    try {
      const mainImage = req.files['image'] ? req.files['image'][0].path : null;
      const extraImages = req.files['images'] ? req.files['images'].map(f => f.path) : [];
      res.status(201).json({ 
        mainImage, 
        extraImages,
        message: 'Files uploaded successfully to Cloudinary'
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// رفع صورة واحدة فقط
router.post(
  '/single',
  protect,
  adminOnly,
  upload.single('image'),
  (req, res) => {
    try {
      const imageUrl = req.file ? req.file.path : null;
      res.status(201).json({ 
        imageUrl,
        message: 'Image uploaded successfully to Cloudinary'
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// رفع صور متعددة
router.post(
  '/multiple',
  protect,
  adminOnly,
  upload.array('images', 10),
  (req, res) => {
    try {
      const imageUrls = req.files ? req.files.map(f => f.path) : [];
      res.status(201).json({ 
        imageUrls,
        message: 'Images uploaded successfully to Cloudinary'
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
