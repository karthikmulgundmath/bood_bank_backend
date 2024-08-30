// src/routes/donorRoutes.ts
import express from "express";
import Donor from "../models/Donor";

const router = express.Router();

// Create a new donor
router.post("/", async (req, res) => {
  try {
    const newDonor = new Donor(req.body);
    await newDonor.save();
    res.status(201).json(newDonor);
  } catch (error) {
    res.status(500).json({ error: "Failed to create donor" });
  }
});

// Get all donors
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve donors" });
  }
});

// Get a specific donor by ID
router.get("/:id", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve donor" });
  }
});

// Update a donor by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedDonor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedDonor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.status(200).json(updatedDonor);
  } catch (error) {
    res.status(500).json({ error: "Failed to update donor" });
  }
});

// Delete a donor by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedDonor = await Donor.findByIdAndDelete(req.params.id);
    if (!deletedDonor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete donor" });
  }
});

export default router;
