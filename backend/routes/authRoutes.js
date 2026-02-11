const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USER || "admin";
  const adminPass = process.env.ADMIN_PASS || "admin123";
  const jwtSecret = process.env.JWT_SECRET || "trio-admin-secret-change-in-production";

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (username !== adminUser || password !== adminPass) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ user: username }, jwtSecret, { expiresIn: "7d" });
  res.json({ token });
});

module.exports = router;
