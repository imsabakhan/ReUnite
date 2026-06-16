const express = require("express");
const router = express.Router();

const LostItem = require("../models/LostItem");
const upload = require("../middleware/upload");

// Create Item
router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      const item = new LostItem({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        status: req.body.status,
        contactEmail: req.body.contactEmail,
        image: req.file ? req.file.path : "",
      });

      await item.save();

      res.status(201).json(item);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

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
    res.status(500).send(err.message);
  }
});

// Get All Items
router.get("/", async (req, res) => {
  try {
    const items = await LostItem.find();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Single Item
router.get("/:id", async (req, res) => {
  try {
    const item = await LostItem.findById(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Mark Item as Found
router.put("/:id/found", async (req, res) => {
  try {
    const updatedItem =
      await LostItem.findByIdAndUpdate(
        req.params.id,
        { status: "found" },
        { new: true }
      );

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Edit Item
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
      status: req.body.status,
      contactEmail: req.body.contactEmail,
    };

    // only update image if new file is uploaded
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedItem = await LostItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Item
router.delete("/:id", async (req, res) => {
  console.log("DELETE REQUEST RECEIVED");
  console.log(req.params.id);

  try {
    await LostItem.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;