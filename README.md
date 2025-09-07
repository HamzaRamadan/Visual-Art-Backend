# Visual Art Backend (Node.js + Express + MongoDB + Cloudinary)

A comprehensive backend API for Visual Art with Cloudinary integration for file uploads and video support.

## 🚀 Quick Start

```bash
# Clone and install
git clone <repository-url>
cd Visual-Art-Backend
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev
```

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB
- Cloudinary account

## ⚙️ Environment Setup

Create a `.env` file with:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/visual-art

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Cloudinary (Required)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Admin (Optional)
ADMIN_EMAIL=admin@visualart.com
ADMIN_PASSWORD=admin123
```

## 🎯 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### File Upload (Cloudinary)

- `POST /api/upload/single` - Upload single image
- `POST /api/upload/multiple` - Upload multiple images
- `POST /api/upload/` - Upload main + additional images

### Video Upload (Cloudinary)

- `POST /api/video-upload/single` - Upload single video (max 4 min)
- `POST /api/video-upload/multiple` - Upload multiple videos
- `POST /api/video-upload/with-thumbnail` - Upload video + thumbnail

### Content Management

- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

- `GET /api/services` - Get all services
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

- `GET /api/videos` - Get current video
- `POST /api/videos` - Upload video (admin only)
- `DELETE /api/videos` - Delete video (admin only)

- `GET /api/news` - Get news
- `GET /api/ads` - Get advertisements
- `GET /api/logistics` - Get logistics info

## 🎥 Video Upload Features

- **Supported formats**: MP4, MOV, AVI, WMV, FLV, WebM
- **Max duration**: 4 minutes
- **Max file size**: 100MB
- **Auto-optimization**: Quality and format optimization
- **Multiple resolutions**: 1280x720, 854x480

## 📸 Image Upload Features

- **Supported formats**: JPG, JPEG, PNG, WebP, GIF
- **Max file size**: 5MB per image
- **Auto-resize**: Max 1000x1000px with aspect ratio maintained
- **Cloud storage**: All files stored in Cloudinary

## 🛠️ Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed:admin # Create admin user
npm run test:cloudinary # Test Cloudinary connection
```

## 📚 Documentation

- [Setup Guide](SETUP_GUIDE.md) - Complete setup instructions
- [Cloudinary Setup](CLOUDINARY_SETUP.md) - File upload guide
- [Video Upload Guide](VIDEO_UPLOAD_GUIDE.md) - Video upload features
- [Gitignore Guide](GITIGNORE_README.md) - Version control setup

## 🔒 Security Features

- JWT authentication
- Admin-only access for uploads
- File type validation
- File size limits
- CORS protection
- Environment variable protection

## 🚀 Deployment

1. Set up MongoDB database
2. Configure Cloudinary account
3. Set production environment variables
4. Deploy to your preferred platform

## 📝 Notes

- Uses ESM (`type: module`)
- All file uploads go to Cloudinary (no local storage)
- Videos are optimized for web delivery
- Images are automatically resized and optimized
- Comprehensive error handling and validation
