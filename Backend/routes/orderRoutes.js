const express = require("express");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Checkout = require("../models/Checkout");
const Order = require("../models/Order");
const {
  authMiddleware,
  admin,
  validate,
} = require("../middleware/authMiddleware");
const router = express.Router();

//@route  GET /api/orders/my-order
//@desc To get the recent order of user

router.get("/my-order", authMiddleware, async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    if (!order) return res.status(404).json({ message: "No Order Found" });
    return res.status(200).json(order);
  } catch (error) {
    console.log("Error ", error.message);
    return res.status(500).json({ message: error.message });
  }
});

//@route GET /api/orders/:id
//@dec get order by id
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id = "" } = req.params;
    if (!id) return res.status(404).json({ message: "ID must be required" });
    const order = await Order.findById(id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: " Order is Not Found" });
    return res.status(200).json(order);
  } catch (error) {
    console.log("Error ", error.message);
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
