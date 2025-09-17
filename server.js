import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './src/config/db.js';
import productRoutes from './src/routes/productRoutes.js';
import serviceRoutes from './src/routes/serviceRoutes.js';
import logisticsRoutes from './src/routes/logisticsRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import videoUploadRoutes from './src/routes/videoUploadRoutes.js';
import newsRoutes from './src/routes/newsRoutes.js';
import videoRoutes from "./src/routes/videoRoutes.js";
import mainNewsRoutes from "./src/routes/mainNewsRoutes.js";
import adsRoutes from './src/routes/adsRoutes.js'; 
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
await connectDB();

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(helmet());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ✅ CORS - شامل كل الـ routes و preflight
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://visualart-iraq.com',
  'https://visual.excellence-horizon.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true,
}));


// Note: Static file serving removed as we're now using Cloudinary for file storage

// Routes
app.get('/', (req, res) => res.json({ status: 'ok', service: 'Al-Farabi API' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/logistics', logisticsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/video-upload', videoUploadRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/main-news', mainNewsRoutes);
app.use('/api/ads', adsRoutes);

// Errors
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
