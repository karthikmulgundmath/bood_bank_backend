// src/routes/authRoutes.ts
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET || "shashidharsecret", { expiresIn: "1h" });
    user.token = token;
    await user.save();

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

router.get("/verify-token", (req, res) => {
  res.json({ message: "Token is valid" });
});

export default router;
