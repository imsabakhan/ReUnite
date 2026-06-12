const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/items", itemRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to ReUnite API 🚀");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/test", (req, res) => {
    res.send(`
        <form action="/api/items/test" method="POST">
            <button type="submit">Add Test Item</button>
        </form>
    `);
});