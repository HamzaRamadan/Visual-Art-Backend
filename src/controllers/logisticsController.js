import Logistics from "../models/Logistics.js";

// Get all
export const getLogistics = async (req, res) => {
  try {
    const logistics = await Logistics.find();
    res.json(logistics);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create
export const createLogistics = async (req, res) => {
  try {
    const logistics = new Logistics(req.body);
    await logistics.save();
    res.status(201).json(logistics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update
export const updateLogistics = async (req, res) => {
  try {
    const logistics = await Logistics.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!logistics) return res.status(404).json({ error: "Not found" });
    res.json(logistics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
export const deleteLogistics = async (req, res) => {
  try {
    const logistics = await Logistics.findByIdAndDelete(req.params.id);
    if (!logistics) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
