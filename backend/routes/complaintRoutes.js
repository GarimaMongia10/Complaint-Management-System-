const express = require("express");
const router = express.Router();

// Temporary working routes

router.post("/", (req, res) => {
  res.json({ message: "Complaint created" });
});

router.get("/", (req, res) => {
  res.json([]);
});

router.put("/:id", (req, res) => {
  res.json({ message: "Complaint updated" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Complaint deleted" });
});

module.exports = router;
