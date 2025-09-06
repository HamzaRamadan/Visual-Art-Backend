import mongoose from "mongoose";

const localizedSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
});

const serviceSchema = new mongoose.Schema(
  {
    ar: localizedSchema,
    en: localizedSchema,
    stats: {
      projects: { type: Number, default: 0 },   // عدد المشاريع
      clients: { type: Number, default: 0 },    // عدد العملاء
      satisfaction: { type: Number, default: 0 }, // نسبة الرضا
    },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
