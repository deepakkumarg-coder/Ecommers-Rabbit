const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

//@route POST api/user/register
//@desc Register a new user

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({ name, email, password });
    await user.save();

    // Create a Payload
    const payload = { user: { id: user._id, role: user.role } };
    jwt.sign(
      payload,
      process.env.JWT_SECRETE_KEY,
      { expiresIn: "1hr" },
      (err, token) => {
        if (err) throw err;

        res.status(201).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          token,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("Sever Error");
  }
});

//route@ POST api/user/login
//@dec authenticate user

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid User" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });
    // Create a Payload
    const payload = { user: { id: user._id, role: user.role } };

    // Create a jwt token

    jwt.sign(
      payload,
      process.env.JWT_SECRETE_KEY,
      { expiresIn: "1hr" },
      (err, token) => {
        if (err) throw err;

        res.status(201).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//@route api/user/profile

router.get("/profile", authMiddleware, (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
