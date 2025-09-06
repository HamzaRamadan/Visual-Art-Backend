import mongoose from "mongoose";

const mainNewsSchema = mongoose.Schema(
  {
    titleAr: { type: String, required: true },
    titleEn: { type: String, required: true },
    descriptionAr: { type: String, required: true },
    descriptionEn: { type: String, required: true },
  },
  { timestamps: true }
);

const MainNews = mongoose.model("MainNews", mainNewsSchema);
export default MainNews;
