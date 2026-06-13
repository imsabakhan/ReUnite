const express = require("express");
const router = express.Router();

const LostItem = require("../models/LostItem");

// Create Item
router.post("/", async (req, res) => {
  try {
    const item = new LostItem(req.body);
    await item.save();

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Test Route
router.post("/test", async (req, res) => {
  try {
    const item = new LostItem({
      title: "Blue Water Bottle",
      description: "Lost near Library",
      category: "Bottle",
      location: "Central Library",
      status: "lost",
      contactEmail: "saba@college.edu",
    });

    await item.save();

    res.send("Item Saved Successfully!");
  } catch (err) {
    res.send(err.message);
  }
});

// Get All Items
router.get("/", async (req, res) => {
  try {
    const items = await LostItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await LostItem.findById(
      req.params.id
    );

    res.json(item);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;