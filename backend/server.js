const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./firebase");
const packageRoutes = require("./routes");
const contactRoutes = require("./contactRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/packages", packageRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Travelia Backend API is running",
  });
});

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

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;