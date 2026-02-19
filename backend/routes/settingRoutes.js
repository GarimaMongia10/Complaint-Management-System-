const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    maxComplaintsPerUser: 10,
  });
});

router.put("/", (req, res) => {
  res.json({ message: "Settings updated" });
});

module.exports = router;
