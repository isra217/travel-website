const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("../firebase");
const packageRoutes = require("../route");
const contactRoutes = require("../contactRoutes");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Travelia Express Backend is working!",
  });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Travelia Backend API is working on Vercel!",
  });
});

// ==========================================
// FIREBASE TEST
// ==========================================

app.get("/test-firebase", async (req, res) => {
  try {
    await db.collection("test").doc("connection").set({
      message: "Firebase connection is working",
      createdAt: new Date(),
    });

    res.json({
      success: true,
      message: "Firebase connected successfully!",
    });
  } catch (error) {
    console.error("Firebase error:", error);

    res.status(500).json({
      success: false,
      message: "Firebase connection failed",
      error: error.message,
    });
  }
});

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/packages", packageRoutes);

app.use("/api/contact", contactRoutes);

// ==========================================
// EXPORT FOR VERCEL
// ==========================================

module.exports = app;