import mongoose from "mongoose";

const localizedSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
});

const logisticsSchema = new mongoose.Schema(
  {
    ar: localizedSchema,
    en: localizedSchema,
    stats: {
      warehouses: { type: Number, default: 0 },
      trucks: { type: Number, default: 0 },
      accuracy: { type: Number, default: 0 },
    },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

const Logistics = mongoose.model("Logistics", logisticsSchema);

export default Logistics;
