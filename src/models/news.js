import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  titleAr: { type: String, required: true },
  titleEn: { type: String, required: true },
  descriptionAr: { type: String },
  descriptionEn: { type: String },
  date: { type: Date, default: Date.now },
  image: { type: String }
}, { timestamps: true });

export default mongoose.model("News", newsSchema);
