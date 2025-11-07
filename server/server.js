// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// ===============================
// 🧩 Middleware
// ===============================
app.use(express.json()); // Parse incoming JSON
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true,
  })
);

// ===============================
// 🖼️ Serve uploaded images
// ===============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===============================
// 📦 Routes
// ===============================
const postRoutes = require("./routes/posts");
const categoryRoutes = require("./routes/categories");
const authRoutes = require("./routes/auth");

app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

// ===============================
// ⚠️ Error Handling Middleware
// ===============================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: err.message });
});

// ===============================
// 💾 MongoDB Connection
// ===============================
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/mern_blog")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ===============================
// 🚀 Server Start
// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
