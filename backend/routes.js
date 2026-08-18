const express = require("express");
const router = express.Router();

const db = require("./firebase");

// ======================================================
// GET ALL PACKAGES
// ======================================================

router.get("/", async (req, res) => {
  try {
    const snapshot = await db
      .collection("packages")
      .orderBy("createdAt", "desc")
      .get();

    const packages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      success: true,
      packages,
    });
  } catch (error) {
    console.error("Get packages error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch packages",
      error: error.message,
    });
  }
});

// ======================================================
// GET ALL BOOKINGS
// ======================================================

router.get("/bookings", async (req, res) => {
  try {
    const snapshot = await db
      .collection("bookings")
      .orderBy("createdAt", "desc")
      .get();

    const bookings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
});

// ======================================================
// GET ALL CONTACT MESSAGES
// ======================================================

router.get("/contact", async (req, res) => {
  try {
    const snapshot = await db
      .collection("contacts")
      .orderBy("createdAt", "desc")
      .get();

    const contacts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error("Get contacts error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages",
      error: error.message,
    });
  }
});

// ======================================================
// GET ONE PACKAGE BY ID
// IMPORTANT: BEFORE /:slug
// Used by /admin/routes/edit?page
// ======================================================

router.get("/id/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await db
      .collection("packages")
      .doc(id)
      .get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.json({
      success: true,
      package: {
        id: doc.id,
        ...doc.data(),
      },
    });
  } catch (error) {
    console.error("Get package by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch package",
      error: error.message,
    });
  }
});

// ======================================================
// GET ONE PACKAGE BY SLUG
// MUST COME AFTER /id/:id
// ======================================================

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const snapshot = await db
      .collection("packages")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    const doc = snapshot.docs[0];

    res.json({
      success: true,
      package: {
        id: doc.id,
        ...doc.data(),
      },
    });
  } catch (error) {
    console.error("Get package error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch package",
      error: error.message,
    });
  }
});

// ======================================================
// CREATE BOOKING
// ======================================================

router.post("/bookings", async (req, res) => {
  try {
    const {
      packageId,
      packageName,
      packageSlug,
      country,
      price,
      fullName,
      email,
      phone,
      travelers,
      travelDate,
      duration,
      message,
    } = req.body;

    if (
      !packageId ||
      !packageName ||
      !fullName ||
      !email ||
      !phone ||
      !travelers ||
      !travelDate ||
      !duration
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const booking = {
      packageId,
      packageName,
      packageSlug: packageSlug || "",
      country: country || "",
      price: Number(price) || 0,

      customer: {
        fullName,
        email,
        phone,
      },

      travelers: Number(travelers),
      travelDate,
      duration,
      message: message || "",

      status: "pending",

      createdAt: new Date(),
    };

    const bookingRef = await db
      .collection("bookings")
      .add(booking);

    res.status(201).json({
      success: true,
      message: "Booking request submitted successfully!",
      bookingId: bookingRef.id,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit booking.",
      error: error.message,
    });
  }
});

// ======================================================
// CREATE CONTACT MESSAGE
// ======================================================

router.post("/contact", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      message,
    } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contactRef = await db
      .collection("contacts")
      .add({
        name,
        phone,
        email,
        message,
        createdAt: new Date(),
      });

    res.status(201).json({
      success: true,
      message: "Contact message submitted successfully",
      id: contactRef.id,
    });
  } catch (error) {
    console.error("Contact submission error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit contact message",
      error: error.message,
    });
  }
});

// ======================================================
// CREATE PACKAGE / ROUTE
// ======================================================

router.post("/", async (req, res) => {
  try {
    const {
      name,
      country,
      price,
      description,
      duration,
      coverImage,
      slug,
    } = req.body;

    if (
      !name ||
      !country ||
      !price ||
      !description ||
      !duration ||
      !slug
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const existingPackage = await db
      .collection("packages")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (!existingPackage.empty) {
      return res.status(400).json({
        success: false,
        message: "A package with this slug already exists.",
      });
    }

    const packageData = {
      name,
      country,
      price: Number(price),
      description,

      duration: Array.isArray(duration)
        ? duration
        : [duration],

      coverImage: coverImage || "",
      slug,

      createdAt: new Date(),
    };

    const packageRef = await db
      .collection("packages")
      .add(packageData);

    res.status(201).json({
      success: true,
      message: "Route created successfully!",
      packageId: packageRef.id,

      package: {
        id: packageRef.id,
        ...packageData,
      },
    });
  } catch (error) {
    console.error("Create package error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create route.",
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE PACKAGE / ROUTE
// ======================================================

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      country,
      price,
      description,
      duration,
      coverImage,
      slug,
    } = req.body;

    if (
      !name ||
      !country ||
      !price ||
      !description ||
      !duration ||
      !slug
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const packageRef = db
      .collection("packages")
      .doc(id);

    const packageDoc = await packageRef.get();

    if (!packageDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Package not found.",
      });
    }

    const existingPackage = await db
      .collection("packages")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (!existingPackage.empty) {
      const existingDoc = existingPackage.docs[0];

      if (existingDoc.id !== id) {
        return res.status(400).json({
          success: false,
          message: "Another package already uses this slug.",
        });
      }
    }

    const updatedPackage = {
      name,
      country,
      price: Number(price),
      description,

      duration: Array.isArray(duration)
        ? duration
        : [duration],

      coverImage: coverImage || "",
      slug,

      updatedAt: new Date(),
    };

    await packageRef.update(updatedPackage);

    res.json({
      success: true,
      message: "Route updated successfully!",

      package: {
        id,
        ...packageDoc.data(),
        ...updatedPackage,
      },
    });
  } catch (error) {
    console.error("Update package error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update route.",
      error: error.message,
    });
  }
});

// ======================================================
// DELETE PACKAGE / ROUTE
// ======================================================

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const packageRef = db
      .collection("packages")
      .doc(id);

    const packageDoc = await packageRef.get();

    if (!packageDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Package not found.",
      });
    }

    await packageRef.delete();

    res.json({
      success: true,
      message: "Route deleted successfully.",
      packageId: id,
    });
  } catch (error) {
    console.error("Delete package error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete route.",
      error: error.message,
    });
  }
});

module.exports = router;