const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@growhigh.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Nursery@123";
const JWT_SECRET = process.env.JWT_SECRET || "growhigh-secret";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  const isEmailMatch = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const passwordMatches = password === ADMIN_PASSWORD;

  if (!isEmailMatch || !passwordMatches) {
    return res.status(401).json({ success: false, message: "Invalid admin credentials." });
  }

  const token = jwt.sign({ role: "admin", email: ADMIN_EMAIL }, JWT_SECRET, {
    expiresIn: "12h",
  });

  return res.json({ success: true, token });
});

module.exports = router;
