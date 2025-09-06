import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ ضمان وجود مجلد uploads
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error('Images only'), false);
};

const upload = multer({ storage, fileFilter });

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
      const mainImage = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null;
      const extraImages = req.files['images'] ? req.files['images'].map(f => `/uploads/${f.filename}`) : [];
      res.status(201).json({ mainImage, extraImages });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
