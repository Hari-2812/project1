import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

/* TEMP ADMIN (replace with DB later) */
const ADMIN_EMAIL = "admin@kidsstore.com";
const ADMIN_PASSWORD = bcrypt.hashSync("Admin@123", 10);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

export default router;
