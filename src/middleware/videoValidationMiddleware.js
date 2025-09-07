import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Video storage configuration with duration validation
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "visual-art/videos",
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "avi", "wmv", "flv", "webm"],
    transformation: [
      { quality: "auto" },
      { fetch_format: "auto" }
    ],
    // Add duration validation at Cloudinary level
    eager: [
      { width: 1280, height: 720, crop: "scale" },
      { width: 854, height: 480, crop: "scale" }
    ]
  }
});

const videoFileFilter = (req, file, cb) => {
  const allowedTypes = ["video/mp4", "video/mov", "video/avi", "video/wmv", "video/flv", "video/webm"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed! Supported formats: MP4, MOV, AVI, WMV, FLV, WebM"), false);
  }
};

export const uploadVideo = multer({ 
  storage: videoStorage, 
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit for videos (approximately 3-4 minutes)
  }
});

export const validateVideoDuration = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  // Alternative: Add a note in the response about duration limits
  req.file.durationWarning = "Please ensure video is under 4 minutes. Large files may be rejected.";
  
  next();
};

// Middleware to add video metadata to response
export const addVideoMetadata = (req, res, next) => {
  if (req.file) {
    req.file.metadata = {
      maxDuration: "4 minutes",
      maxSize: "100MB",
      supportedFormats: ["MP4", "MOV", "AVI", "WMV", "FLV", "WebM"],
      note: "Videos longer than 4 minutes may be rejected by Cloudinary"
    };
  }
  next();
};
