require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require(
  "./routes/authRoutes"
);

const app = express();

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://re-unite.vercel.app",
    ],
  methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log("REQUEST HIT:", req.method, req.url);
  next();
});


app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);

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