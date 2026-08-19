const express = require("express");
const cors = require("cors");

const packageRoutes = require("../routes");
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
// API ROUTES
// ==========================================

app.use("/api/packages", packageRoutes);

app.use("/api/contact", contactRoutes);

// ==========================================
// EXPORT FOR VERCEL
// ==========================================

module.exports = app;