const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
    id: { type: String, default: "global_stats", unique: true },
    pending: { type: Number, default: 0 },
    inProgress: { type: Number, default: 0 },
    resolved: { type: Number, default: 0 },
    closed: { type: Number, default: 0 }
});

module.exports = mongoose.model("Settings", settingsSchema);
