import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
  img: { type: String, required: true },
    // imgList: [{ type: String, required: false }], 
    imgList: { type: [String], default: [] },

  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String, required: true }],
}, { _id: false });

const productSchema = new mongoose.Schema(
  {
    ar: [translationSchema],
    en: [translationSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
