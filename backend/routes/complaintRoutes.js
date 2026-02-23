const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const Settings = require("../models/Settings");
const authMiddleware = require("../middleware/authMiddleware");

// Helper to update settings
const updateSettings = async (status, increment) => {
    const update = {};
    if (status === "Pending") update.pending = increment;
    else if (status === "In Progress") update.inProgress = increment;
    else if (status === "Resolved") update.resolved = increment;
    else if (status === "Closed") update.closed = increment;

    if (Object.keys(update).length > 0) {
        await Settings.findOneAndUpdate(
            { id: "global_stats" },
            { $inc: update },
            { upsert: true, new: true }
        );
    }
};

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
        await updateSettings(savedComplaint.status, 1);
        res.status(201).json(savedComplaint);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a complaint
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { title, description, category, priority, status } = req.body;

        // Find existing to know if status changed
        const existingComplaint = await Complaint.findById(req.params.id);
        if (!existingComplaint) {
            return res.status(404).json({ error: "Complaint not found" });
        }

        // Removed strict ownership checks to fulfill user's request for a fully common and editable dashboard
        const oldStatus = existingComplaint.status;

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { title, description, category, priority, status },
            { new: true }
        );

        if (status && oldStatus !== status) {
            await updateSettings(oldStatus, -1);
            await updateSettings(status, 1);
        }

        res.json(updatedComplaint);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a complaint
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);
        if (!deletedComplaint) {
            return res.status(404).json({ error: "Complaint not found" });
        }
        await updateSettings(deletedComplaint.status, -1);
        res.json({ message: "Complaint deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get logged-in user's complaints
router.get("/my-complaints", authMiddleware, async (req, res) => {
    try {
        const complaints = await Complaint.find({ user: req.user.id }).populate("user", "name email").sort({ createdAt: -1 });
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
