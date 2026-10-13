const express = require("express");
const Order = require("../models/Order");
const {
  authMiddleware,
  admin,
  validate,
} = require("../middleware/authMiddleware");
const router = express.Router();

//@router GET /admin/api/orders
//@desc To get all the order from database
router.get("/", authMiddleware, admin, async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders" });
    } else {
      return res.status(200).json(orders);
    }
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

//@route PUT /admin/api/orders
//@desc To update th status of order
router.put("/:id", authMiddleware, admin, async (req, res, next) => {
  try {
    const { id = "" } = req.params;
    if (!id || typeof id !== "string")
      return res.status(404).json({ message: "Id is required " });
    const order = await Order.findById(id);
    if (order) {
      order.status = req.body.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.DeliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.DeliveredAt;
      await order.save();
      return res.status(200).json({ message: "Order Updated Successfully" });
    } else {
      return res.status(404).json({ message: "Order Not Found" });
    }
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

//@router DELETE admin/api/orders
//@desc To Delete a order from database

router.delete("/:id", authMiddleware, admin, async (req, res, next) => {
  try {
    const { id = "" } = req.params;
    if (!id || typeof id !== "string")
      return res.status(404).json({ message: "Id is required " });
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "order Not Found" });
    await order.deleteOne();
    return res.status(200).json({ message: "order Delete Succesfully" });
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
