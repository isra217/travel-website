const express = require("express");
const router = express.Router();

const db = require("./firebase");

// GET ALL PACKAGES
router.get("/", async (req, res) => {
    try {
        const snapshot = await db.collection("packages").get();

        const packages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.json({
            success: true,
            packages,
        });
    } catch (error) {
        console.error("Error fetching packages:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch packages",
            error: error.message,
        });
    }
});


// CREATE PACKAGE
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
            !coverImage ||
            !slug
        ) {
            return res.status(400).json({
                success: false,
                message: "All package fields are required",
            });
        }

        const packageData = {
            name,
            country,
            price: Number(price),
            description,
            duration,
            coverImage,
            slug,
            createdAt: new Date(),
        };

        const docRef = await db
            .collection("packages")
            .add(packageData);

        res.status(201).json({
            success: true,
            message: "Package created successfully",
            package: {
                id: docRef.id,
                ...packageData,
            },
        });
    } catch (error) {
        console.error("Error creating package:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create package",
            error: error.message,
        });
    }
});


module.exports = router;