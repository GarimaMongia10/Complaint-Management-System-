const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const authMiddleware = require("../middleware/authMiddleware");

// Create a complaint
router.post("/create", authMiddleware, async (req, res) => {
    try {
        const { title, description, category, priority } = req.body;
        const newComplaint = new Complaint({
            user: req.user.id,
            title,
            description,
            category,
            priority
        });
        const savedComplaint = await newComplaint.save();
        res.status(201).json(savedComplaint);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get logged-in user's complaints
router.get("/my-complaints", authMiddleware, async (req, res) => {
    try {
        const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all complaints (Admin only)
router.get("/all", authMiddleware, async (req, res) => {
    try {
        // In a real app, check for admin role here
        const complaints = await Complaint.find().populate("user", "name email").sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
