const express = require("express");
const Subscriber = require("../models/Subscriber");
const router = express.Router();

//@router POST /api/subscribe
//@desc To store the NewsLetter subscribed information

router.post("/", async (req, res, next) => {
  try {
    const { email = "" } = req.body;
    console.log("this is checking email",email);
    
    if (!email) return res.status(404).json({ message: "Email is required" });
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber)
      return res.status(404).json({ message: "Email Already Exists" });
    subscriber = new Subscriber({ email });
    await subscriber.save();
    return res.status(200).json({message:"Succesfully Subscribed to NewsLetter"})
  } catch (error) {
    console.log("Error Message : ", error);
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
