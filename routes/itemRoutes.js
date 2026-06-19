const express = require("express");
const router = express.Router();

const LostItem = require("../models/LostItem");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const item = new LostItem({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
      status: req.body.status,
      contactEmail: req.body.contactEmail,
      userId: req.user.id,
      image: req.file ? req.file.path : null,
    });

    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await LostItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/my-items", auth, async (req, res) => {
  try {
    const items = await LostItem.find({ userId: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id/found", auth, authorize("admin"), async (req, res) => {
  try {
    const updated = await LostItem.findByIdAndUpdate(
      req.params.id,
      { status: "found" },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (
      item.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed to edit this item" });
    }

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
      status: req.body.status,
      contactEmail: req.body.contactEmail,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await LostItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (
      item.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed to delete this item" });
    }

    await item.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;