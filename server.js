const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://re-unite.vercel.app",
    ],
   methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to ReUnite API 🚀");
});

app.get("/test", (req, res) => {
  res.send(`
    <form action="/api/items/test" method="POST">
      <button type="submit">Add Test Item</button>
    </form>
  `);
});

const PORT = process.env.PORT || 8000;

// ✅ IMPORTANT FIX: connect DB first, THEN start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err);
  });