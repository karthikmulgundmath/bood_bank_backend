// src/routes/requestRoutes.ts
import express from "express";
import Request from "../models/Request";

const router = express.Router();

// Create a new request
router.post("/", async (req, res) => {
  try {
    const { name, location, request } = req.body;
    const newRequest = new Request({ name, location, request });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: "Failed to create request" });
  }
});

// Get all requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve requests" });
  }
});

// Get a specific request by ID
router.get("/:id", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve request" });
  }
});

// Update a request by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, location, request } = req.body;
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { name, location, request },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: "Failed to update request" });
  }
});

// Delete a request by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRequest = await Request.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete request" });
  }
});

export default router;
