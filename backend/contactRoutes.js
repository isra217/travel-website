const express = require("express");
const router = express.Router();

const db = require("./firebase");

// ==========================================
// SUBMIT CONTACT FORM
// ==========================================

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email, 
      phone,
      subject,
      message,
    } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    // Contact submission
    const contact = {
      name,
      email,
      phone: phone || "",
      subject: subject || "",
      message,

      status: "unread",

      createdAt: new Date(),
    };

    // Save to Firebase
    const contactRef = await db
      .collection("contacts")
      .add(contact);

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      contactId: contactRef.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit contact form.",
      error: error.message,
    });
  }
});

module.exports = router;