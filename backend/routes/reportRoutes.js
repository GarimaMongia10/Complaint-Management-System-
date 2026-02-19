const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    totalComplaints: 0,
    resolved: 0,
    users: 0,
  });
});

module.exports = router;
