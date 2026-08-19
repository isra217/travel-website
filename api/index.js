const express = require("express");
const cors = require("cors");

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

app.use("/api/packages", packageRoutes);
app.use("/api/contact", contactRoutes);

module.exports = app;