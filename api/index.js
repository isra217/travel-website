const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("../backend/firebase");
const packageRoutes = require("../backend/routes");
const contactRoutes = require("../backend/contactRoutes");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

// ================================
// TEST
// ================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Travelia Express Backend is working!",
  });
});

// ================================
// API ROUTES
// ================================

app.use("/api/packages", packageRoutes);
app.use("/api/contact", contactRoutes);

module.exports = app;