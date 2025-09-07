import { Router } from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { uploadVideo, validateVideoDuration, addVideoMetadata } from '../middleware/videoValidationMiddleware.js';

const router = Router();

// Upload single video
router.post(
  '/single',
  protect,
  adminOnly,
  uploadVideo.single('video'),
  validateVideoDuration,
  addVideoMetadata,
  (req, res) => {
    try {
      const videoUrl = req.file ? req.file.path : null;
      const videoInfo = req.file ? {
        url: req.file.path,
        publicId: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        metadata: req.file.metadata,
        durationWarning: req.file.durationWarning
      } : null;
      
      res.status(201).json({ 
        videoUrl,
        videoInfo,
        message: 'Video uploaded successfully to Cloudinary'
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Upload multiple videos
router.post(
  '/multiple',
  protect,
  adminOnly,
  uploadVideo.array('videos', 5), // Max 5 videos
  validateVideoDuration,
  addVideoMetadata,
  (req, res) => {
    try {
      const videoUrls = req.files ? req.files.map(f => f.path) : [];
      const videoInfos = req.files ? req.files.map(f => ({
        url: f.path,
        publicId: f.filename,
        size: f.size,
        mimetype: f.mimetype,
        metadata: f.metadata,
        durationWarning: f.durationWarning
      })) : [];
      
      res.status(201).json({ 
        videoUrls,
        videoInfos,
        message: 'Videos uploaded successfully to Cloudinary'
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Upload video with thumbnail
router.post(
  '/with-thumbnail',
  protect,
  adminOnly,
  uploadVideo.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  (req, res) => {
    try {
      const videoFile = req.files['video'] ? req.files['video'][0] : null;
      const thumbnailFile = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
      
      const result = {
        video: videoFile ? {
          url: videoFile.path,
          publicId: videoFile.filename,
          size: videoFile.size,
          mimetype: videoFile.mimetype
        } : null,
        thumbnail: thumbnailFile ? {
          url: thumbnailFile.path,
          publicId: thumbnailFile.filename,
          size: thumbnailFile.size,
          mimetype: thumbnailFile.mimetype
        } : null,
        message: 'Video and thumbnail uploaded successfully to Cloudinary'
      };
      
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
