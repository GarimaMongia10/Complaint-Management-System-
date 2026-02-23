require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Complaint = require("./models/Complaint");
const Settings = require("./models/Settings");

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Create Dummy Users
        const passwordHash = await bcrypt.hash("password123", 10);

        let user1 = await User.findOne({ email: "alice@example.com" });
        if (!user1) {
            user1 = await User.create({ name: "Alice Johnson", email: "alice@example.com", password: passwordHash });
        }

        let user2 = await User.findOne({ email: "bob@example.com" });
        if (!user2) {
            user2 = await User.create({ name: "Bob Smith", email: "bob@example.com", password: passwordHash });
        }

        // Create Dummy Complaints
        const dummyComplaints = [
            {
                user: user1._id,
                title: "Login page keeps refreshing",
                description: "Whenever I click submit, it just refreshes without logging me in. I'm using Chrome 114.",
                category: "Technical",
                priority: "High",
                status: "Pending"
            },
            {
                user: user2._id,
                title: "Incorrect billing amount",
                description: "This month's invoice shows $40, but my plan is only $20.",
                category: "Billing",
                priority: "Medium",
                status: "In Progress"
            },
            {
                user: user1._id,
                title: "Feature Request: Dark Mode",
                description: "Please add a toggle to switch to dark mode. The current brightness hurts my eyes.",
                category: "Feedback",
                priority: "Low",
                status: "Resolved"
            }
        ];

        let insertedCount = 0;
        for (const c of dummyComplaints) {
            const exists = await Complaint.findOne({ title: c.title });
            if (!exists) {
                await Complaint.create(c);
                insertedCount++;
            }
        }

        console.log(`Inserted ${insertedCount} dummy complaints.`);

        // Re-sync Settings
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
        console.log("Settings synchronized.");

        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

seed();
