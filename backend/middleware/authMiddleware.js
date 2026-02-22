const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("User authenticated:", req.user);
    next();
  } catch (err) {
    console.log("Invalid token:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
