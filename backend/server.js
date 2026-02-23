require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Sync Settings based on existing complaints
    try {
      const Settings = require("./models/Settings");
      const Complaint = require("./models/Complaint");

      const stats = await Complaint.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]);

      let pending = 0, inProgress = 0, resolved = 0, closed = 0;
      stats.forEach(s => {
        if (s._id === "Pending") pending = s.count;
        if (s._id === "In Progress") inProgress = s.count;
        if (s._id === "Resolved") resolved = s.count;
        if (s._id === "Closed") closed = s.count;
      });

      await Settings.findOneAndUpdate(
        { id: "global_stats" },
        { pending, inProgress, resolved, closed },
        { upsert: true, new: true }
      );
      console.log("Settings synced with current complaints.");
    } catch (err) {
      console.error("Error syncing settings:", err.message);
    }
  })
  .catch(err => console.log(err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/complaint", require("./routes/complaintRoutes"));
//app.use("/api/reports", require("./routes/reportRoutes"));
//app.use("/api/settings", require("./routes/settingRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Complaint API Running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});