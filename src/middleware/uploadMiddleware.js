import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Image storage configuration
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "visual-art/images",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }]
  }
});

// Video storage configuration
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "visual-art/videos",
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "avi", "wmv", "flv", "webm"],
    transformation: [
      { quality: "auto" },
      { fetch_format: "auto" }
    ]
  }
});

const imageFileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

const videoFileFilter = (req, file, cb) => {
  const allowedTypes = ["video/mp4", "video/mov", "video/avi", "video/wmv", "video/flv", "video/webm"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only videos are allowed!"), false);
  }
};

// Image upload middleware
export const upload = multer({ 
  storage: imageStorage, 
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit for images
  }
});

// Video upload middleware
export const uploadVideo = multer({ 
  storage: videoStorage, 
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit for videos (3-4 min max)
  }
});
